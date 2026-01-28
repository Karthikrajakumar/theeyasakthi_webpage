import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import PageTransition from "../PageTransition";
import WatchActions from "../components/WatchActions";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

export default function PodcastWatch() {
  const { id } = useParams();

  const [podcast, setPodcast] = useState(null);

  const playerRef = useRef(null);
  const ytContainerRef = useRef(null);

  /* -------- FETCH PODCAST -------- */
  useEffect(() => {
    const fetchPodcast = async () => {
      const snap = await getDoc(doc(db, "podcasts", id));
      if (snap.exists()) setPodcast({ id: snap.id, ...snap.data() });
    };
    fetchPodcast();
  }, [id]);

  /* -------- LOAD YOUTUBE PLAYER -------- */
  useEffect(() => {
    if (!podcast) return;

    const createPlayer = () => {
      if (playerRef.current) return;

      playerRef.current = new window.YT.Player(ytContainerRef.current, {
        videoId: podcast.videoId,
        playerVars: {
          autoplay: 1,
          playsinline: 1,
          rel: 0,
          modestbranding: 1,
        },
        events: {
          onStateChange: (event) => {
            if (event.data === window.YT.PlayerState.ENDED) {
              // 🔁 replay in same player
              playerRef.current.seekTo(0);
              playerRef.current.playVideo();
            }
          },
        },
      });
    };

    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);
      window.onYouTubeIframeAPIReady = createPlayer;
    } else {
      createPlayer();
    }
  }, [podcast]);

  /* -------- CLEANUP -------- */
  useEffect(() => {
    return () => {
      if (playerRef.current?.destroy) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
    };
  }, []);

  if (!podcast) return <h2 style={{ padding: 40 }}>Loading podcast...</h2>;

  return (
    <PageTransition>
      <Container style={{ marginTop: "30px" }}>
        <div className="video-wrapper">
          <div ref={ytContainerRef} />
        </div>

        <div className="watch-header">
          <h1 className="video-title">{podcast.title}</h1>

          <WatchActions
            itemId={podcast.id}
            type="podcast"
            videoUrl={`https://www.youtube.com/watch?v=${podcast.videoId}`}
          />
        </div>

        <div className="video-meta">
          <span>{podcast.host}</span>
        </div>
      </Container>
    </PageTransition>
  );
}
