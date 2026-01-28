import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import PageTransition from "../PageTransition";
import WatchActions from "../components/WatchActions";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

export default function VideoWatch() {
  const { id } = useParams();

  const [video, setVideo] = useState(null);

  const playerRef = useRef(null);
  const ytContainerRef = useRef(null);

  /* -------- FETCH VIDEO -------- */


  useEffect(() => {
    const fetchVideo = async () => {
      const snap = await getDoc(doc(db, "videos", id));
      if (snap.exists()) setVideo({ id: snap.id, ...snap.data() });
    };
    fetchVideo();
  }, [id]);


  /* -------- LOAD YOUTUBE PLAYER -------- */
  useEffect(() => {
    if (!video) return;

    const createPlayer = () => {
      if (playerRef.current) return;

      playerRef.current = new window.YT.Player(ytContainerRef.current, {
        videoId: video.videoId,
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
  }, [video]);

  /* -------- CLEANUP -------- */
  useEffect(() => {
    return () => {
      if (playerRef.current?.destroy) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
    };
  }, []);

  if (!video) return <h2 style={{ padding: 40 }}>Loading video...</h2>;

  return (
    <PageTransition>
      <Container style={{ marginTop: "30px" }}>
        <div className="video-wrapper">
          <div ref={ytContainerRef} />
        </div>

        <div className="watch-header">
          <h1 className="video-title">{video.title}</h1>

          <WatchActions
            itemId={video.id}
            type="video"
            videoUrl={`https://www.youtube.com/watch?v=${video.videoId}`}
          />
        </div>

        <div className="video-meta">
          <span>{video.host}</span>
        </div>
      </Container>
    </PageTransition>
  );
}
