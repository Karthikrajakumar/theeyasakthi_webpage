import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  collection,
  getDocs,
  query,
  orderBy,
  limit
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import "./VideoCarousel.css";

const buildSlides = items =>
  items.length > 0 ? [items[items.length - 1], ...items, items[0]] : [];

const parseDurationSeconds = iso => {
  if (!iso) return null;
  const h = parseInt(iso.match(/(\d+)H/)?.[1] || 0, 10);
  const m = parseInt(iso.match(/(\d+)M/)?.[1] || 0, 10);
  const s = parseInt(iso.match(/(\d+)S/)?.[1] || 0, 10);
  const total = h * 3600 + m * 60 + s;
  return Number.isFinite(total) ? total : null;
};

async function fetchYouTubeFallback(limitCount = 12) {
  const apiKey = process.env.REACT_APP_YOUTUBE_API_KEY;
  const channelId = process.env.REACT_APP_YOUTUBE_CHANNEL_ID;
  if (!apiKey || !channelId) return { shorts: [], videos: [] };

  // Grab uploads playlist
  const channelRes = await fetch(
    `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${channelId}&key=${apiKey}`
  );
  const channelData = await channelRes.json();
  const uploadsId = channelData.items?.[0]?.contentDetails?.relatedPlaylists?.uploads;
  if (!uploadsId) return { shorts: [], videos: [] };

  const playlistRes = await fetch(
    `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${uploadsId}&maxResults=${limitCount}&key=${apiKey}`
  );
  const playlistData = await playlistRes.json();
  const videoIds = playlistData.items
    ?.map(item => item.snippet?.resourceId?.videoId)
    .filter(Boolean) || [];

  if (!videoIds.length) return { shorts: [], videos: [] };

  const detailsRes = await fetch(
    `https://www.googleapis.com/youtube/v3/videos?part=contentDetails,snippet&id=${videoIds.join(",")}&key=${apiKey}`
  );
  const detailsData = await detailsRes.json();

  const shorts = [];
  const videos = [];

  detailsData.items?.forEach(item => {
    const durationSeconds = parseDurationSeconds(item.contentDetails?.duration);
    const isShort = typeof durationSeconds === "number" && durationSeconds < 90;
    const payload = {
      id: item.id,
      videoId: item.id,
      title: item.snippet?.title || "",
      thumbnail:
        item.snippet?.thumbnails?.maxres?.url ||
        item.snippet?.thumbnails?.standard?.url ||
        item.snippet?.thumbnails?.high?.url ||
        item.snippet?.thumbnails?.medium?.url ||
        item.snippet?.thumbnails?.default?.url,
      publishedAt: item.snippet?.publishedAt,
      durationSeconds,
      isShort,
      type: isShort ? "short" : "video"
    };

    if (isShort) {
      shorts.push(payload);
    } else {
      videos.push(payload);
    }
  });

  return { shorts, videos };
}

function CarouselBlock({ title, items, loading, emptyMessage }) {
  const [index, setIndex] = useState(1);
  const [speed, setSpeed] = useState(".6s");

  useEffect(() => {
    if (items.length > 0) setIndex(1);
  }, [items]);

  const next = useCallback(() => {
    setIndex(i => i + 1);
  }, []);

  const prev = useCallback(() => {
    setIndex(i => i - 1);
  }, []);

  useEffect(() => {
    if (items.length < 2) return;
    const timer = setInterval(next, 4500);
    return () => clearInterval(timer);
  }, [next, items.length]);

  useEffect(() => {
    if (items.length < 2) return;

    const len = items.length + 2;

    if (index === len - 1) {
      setTimeout(() => {
        setSpeed("0s");
        setIndex(1);
        setTimeout(() => setSpeed(".6s"), 20);
      }, 600);
    }

    if (index === 0) {
      setTimeout(() => {
        setSpeed("0s");
        setIndex(len - 2);
        setTimeout(() => setSpeed(".6s"), 20);
      }, 600);
    }
  }, [index, items.length]);

  const slides = buildSlides(items);
  const disableNav = items.length < 2;

  console.log(`🎬 CarouselBlock "${title}":`, { 
    loading, 
    itemsCount: items.length, 
    slidesCount: slides.length,
    index,
    items,
    slides 
  });

  return (
    <section className="carousel-section">
      <div className="carousel-header">
        <h2 className="carousel-title">{title}</h2>
      </div>

      {loading ? (
        <p className="carousel-msg">Loading videos…</p>
      ) : items.length === 0 ? (
        <p className="carousel-msg">{emptyMessage}</p>
      ) : (
        <div className="simple-carousel">
          <button className="nav left" onClick={prev} disabled={disableNav}>
            ❮
          </button>

          <div className="track-wrapper">
            <div
              className="track"
              style={{
                transform: `translateX(-${index * 100}%)`,
                transition: speed
              }}
            >
              {slides.map((video, i) => {
                console.log(`🖼️ Rendering slide ${i}:`, {
                  videoId: video.videoId,
                  thumbnail: video.thumbnail,
                  title: video.title
                });
                return (
                  <div className="slide" key={`${video.id || video.videoId}-${i}`}>
                    <Link
                      to={`/youtube/${video.videoId}`}
                      className="thumb-link"
                    >
                      <img
                        src={video.thumbnail}
                        alt={video.title || 'Video thumbnail'}
                        className="thumb-img"
                        onLoad={() => console.log(`✅ Image loaded: ${video.videoId}`)}
                        onError={(e) => {
                          console.error(`❌ Image failed to load: ${video.videoId}`, video.thumbnail);
                          e.target.src = `https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`;
                        }}
                      />
                      <span className="play-overlay">▶</span>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>

          <button className="nav right" onClick={next} disabled={disableNav}>
            ❯
          </button>
        </div>
      )}
    </section>
  );
}

export default function VideoCarousel() {
  const [shorts, setShorts] = useState([]);
  const [longVideos, setLongVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const fetchLatest = async () => {
      try {
        setLoading(true);
        setErrorMsg("");

        console.log("🔥 VideoCarousel: Starting fetch...");
        console.log("🔥 Firebase DB instance:", db);

        let snap;

        try {
          console.log("🔥 Attempting ordered query...");
          const q = query(
            collection(db, "videos"),
            orderBy("publishedAt", "desc"),
            limit(18)
          );
          snap = await getDocs(q);
          console.log("✅ Ordered query succeeded, docs:", snap.docs.length);
        } catch (orderingError) {
          console.warn("⚠️ Ordered query failed, falling back to unordered fetch", orderingError);
          snap = await getDocs(collection(db, "videos"));
          console.log("✅ Unordered fetch succeeded, docs:", snap.docs.length);
        }

        console.log("📊 Raw Firestore docs:", snap.docs.length);

        const data = snap.docs
          .map(doc => {
            const raw = doc.data();
            console.log("📄 Document:", doc.id, raw);
            const fallbackThumb = raw.videoId
              ? `https://img.youtube.com/vi/${raw.videoId}/hqdefault.jpg`
              : "";

            return {
              id: doc.id,
              ...raw,
              thumbnail: raw.thumbnail || fallbackThumb
            };
          })
          .filter(video => {
            const hasVideoId = Boolean(video.videoId);
            console.log(`🔍 Video ${video.id} has videoId:`, hasVideoId, video.videoId);
            return hasVideoId;
          });

        console.log("✅ Filtered data (with videoId):", data.length, data);

        const normalizeDate = value => {
          if (!value) return 0;
          if (typeof value.toMillis === "function") return value.toMillis();
          if (value.seconds) return value.seconds * 1000 + (value.nanoseconds || 0) / 1e6;
          const parsed = Date.parse(value);
          return Number.isFinite(parsed) ? parsed : 0;
        };

        const sorted = data
          .slice()
          .sort((a, b) => normalizeDate(b.publishedAt || b.createdAt) - normalizeDate(a.publishedAt || a.createdAt))
          .slice(0, 18);

        console.log("✅ Sorted data:", sorted.length);

        const shortsOnly = [];
        const videosOnly = [];

        sorted.forEach(video => {
          const typeField = (video.type || "").toLowerCase();
          const isShortField = video.isShort === true;
          const duration = typeof video.durationSeconds === "number" ? video.durationSeconds : null;

          const isShort =
            isShortField ||
            typeField === "short" ||
            typeField === "shorts" ||
            (duration !== null && duration > 0 && duration < 60);

          const isVideo =
            (typeField === "video" && !isShortField) ||
            (duration !== null && duration >= 90) ||
            (duration === null && video.isShort === false && typeField !== "short" && typeField !== "shorts");

          if (isShort) {
            shortsOnly.push(video);
          } else if (isVideo) {
            videosOnly.push(video);
          }
        });

        console.log("✅ FINAL RESULTS:", {
          totalFromFirestore: data.length,
          afterSort: sorted.length,
          shortsCount: shortsOnly.length,
          videosCount: videosOnly.length,
          shortsData: shortsOnly.map(v => ({ id: v.videoId, title: v.title, type: v.type, dur: v.durationSeconds })),
          videosData: videosOnly.map(v => ({ id: v.videoId, title: v.title, type: v.type, dur: v.durationSeconds }))
        });

        setShorts(shortsOnly.slice(0, 3));
        setLongVideos(videosOnly.slice(0, 3));

        const missingData = shortsOnly.length === 0 && videosOnly.length === 0;

        if (missingData) {
          console.log("⚠️ No data from Firestore, trying YouTube API fallback...");
          const fallback = await fetchYouTubeFallback(6);
          console.log("✅ YouTube fallback result:", fallback);
          if (fallback.shorts.length || fallback.videos.length) {
            setShorts(fallback.shorts.slice(0, 3));
            setLongVideos(fallback.videos.slice(0, 3));
          }
        }
      } catch (err) {
        console.error("❌ Failed to load videos", err);
        try {
          console.log("⚠️ Trying YouTube API fallback due to error...");
          const fallback = await fetchYouTubeFallback(6);
          setShorts(fallback.shorts.slice(0, 3));
          setLongVideos(fallback.videos.slice(0, 3));
          setErrorMsg("Firestore fetch failed; showing YouTube fallback");
        } catch (ytError) {
          console.error("❌ YouTube fallback failed", ytError);
          setShorts([]);
          setLongVideos([]);
          setErrorMsg("Unable to load videos from Firestore or YouTube. Check API key/Channel ID and network.");
        }
      } finally {
        setLoading(false);
        console.log("🏁 VideoCarousel fetch complete");
      }
    };

    fetchLatest();
  }, []);

  return (
    <div className="about-subtitle">
      
      <CarouselBlock
        title="Latest Videos"
        items={longVideos}
        loading={loading}
        emptyMessage="No videos available."
      />
      
      <CarouselBlock
        title="Latest Shorts"
        items={shorts}
        loading={loading}
        emptyMessage="No shorts available."
      />

      

      {errorMsg && <p className="carousel-msg" style={{ color: "#fca5a5" }}>{errorMsg}</p>}
    </div>
  );
}
