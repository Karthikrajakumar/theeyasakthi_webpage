import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import PageTransition from "../PageTransition";
import WatchActions from "../components/WatchActions";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

export default function SongWatch() {
  const { id } = useParams();

  const [song, setSong] = useState(null);

  const playerRef = useRef(null);
  const ytContainerRef = useRef(null);

  /* -------- FETCH SONG -------- */
  useEffect(() => {
    const fetchSong = async () => {
      const snap = await getDoc(doc(db, "songs", id));
      if (snap.exists()) setSong({ id: snap.id, ...snap.data() });
    };
    fetchSong();
  }, [id]);

  /* -------- LOAD YOUTUBE PLAYER -------- */
  useEffect(() => {
    if (!song) return;

    const createPlayer = () => {
      if (playerRef.current) return; // 🔒 prevent recreation

      playerRef.current = new window.YT.Player(ytContainerRef.current, {
        videoId: song.videoId,
        playerVars: {
          autoplay: 1,
          playsinline: 1,
          rel: 0,
          modestbranding: 1,
        },
        events: {
          onStateChange: (event) => {
            if (event.data === window.YT.PlayerState.ENDED) {
              // 🔁 REPLAY IN SAME PLAYER, SAME UI
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
  }, [song]);

  /* -------- CLEANUP -------- */
  useEffect(() => {
    return () => {
      if (playerRef.current?.destroy) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
    };
  }, []);

  if (!song) return <h2 style={{ padding: 40 }}>Loading song...</h2>;

  return (
    <PageTransition>
      <Container style={{ marginTop: "30px" }}>
        {/* -------- SAME PLAYER, SAME UI -------- */}
        <div className="video-wrapper">
          <div ref={ytContainerRef} />
        </div>

        {/* -------- HEADER -------- */}
        <div className="watch-header">
          <h1 className="video-title">{song.title}</h1>

          <WatchActions
            itemId={song.id}
            type="song"
            videoUrl={`https://www.youtube.com/watch?v=${song.videoId}`}
          />
        </div>

        {/* -------- META -------- */}
        <div className="video-meta">
          <span>{song.host}</span>
        </div>
      </Container>
    </PageTransition>
  );
}

