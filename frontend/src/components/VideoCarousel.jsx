import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";

export default function VideoCarousel() {
  const [videos, setVideos] = useState([]);
  const [index, setIndex] = useState(1);
  const [speed, setSpeed] = useState(".6s");
  const [loading, setLoading] = useState(true);

  /* Fetch latest 3 long-form videos */
  useEffect(() => {
    const fetchLatest = async () => {
      try {
        setLoading(true);
        const res = await fetch("http://localhost:5000/api/youtube/latest");
        const data = await res.json();
        setVideos(data || []);
      } catch (err) {
        console.error("Failed to load videos", err);
        setVideos([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLatest();
  }, []);

  /* Reset index when data loads */
  useEffect(() => {
    if (videos.length > 0) setIndex(1);
  }, [videos]);

  const next = useCallback(() => {
    setIndex(i => i + 1);
  }, []);

  const prev = () => {
    setIndex(i => i - 1);
  };

  /* Auto-slide */
  useEffect(() => {
    if (videos.length < 2) return;
    const timer = setInterval(next, 4500);
    return () => clearInterval(timer);
  }, [next, videos.length]);

  /* Infinite loop fix */
  useEffect(() => {
    if (videos.length < 2) return;
    const len = videos.length + 2;

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
  }, [index, videos.length]);

  const slides =
    videos.length > 0
      ? [videos[videos.length - 1], ...videos, videos[0]]
      : [];

  return (
    <section className="carousel-section">
      <h2 className="carousel-title">Latest Videos</h2>

      {loading ? (
        <p className="carousel-msg">Loading videos…</p>
      ) : videos.length === 0 ? (
        <p className="carousel-msg">No long-form videos available yet.</p>
      ) : (
        <div className="simple-carousel">
          <button className="nav left" onClick={prev}>❮</button>

          <div className="track-wrapper">
            <div
              className="track"
              style={{
                transform: `translateX(-${index * 100}%)`,
                transition: speed,
              }}
            >
              {slides.map((video, i) => (
                <div className="slide" key={i}>
                  <Link to={`/youtube/${video.id}`} className="thumb-link">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="thumb-img"
                    />
                    <span className="play-overlay">▶</span>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          <button className="nav right" onClick={next}>❯</button>
        </div>
      )}
    </section>
  );
}
