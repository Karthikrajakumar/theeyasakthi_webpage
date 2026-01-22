import { useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function YouTubeWatch() {
  const { id } = useParams();
  const navigate = useNavigate();
  const playerRef = useRef(null);

  useEffect(() => {
    const createPlayer = () => {
      if (playerRef.current) {
        playerRef.current.destroy();
      }

      playerRef.current = new window.YT.Player("yt-player", {
        videoId: id,
        playerVars: {
          autoplay: 1,
          mute: 0,
          rel: 0,
          modestbranding: 1,
          iv_load_policy: 3,
        },
        events: {
          onStateChange: (event) => {
            if (event.data === window.YT.PlayerState.ENDED) {
              sessionStorage.setItem("resumeCarousel", "true");
              navigate("/");
            }
          },
        },
      });
    };

    // 1️⃣ If API already loaded
    if (window.YT && window.YT.Player) {
      createPlayer();
    } else {
      // 2️⃣ Load API only once
      const existingScript = document.getElementById("youtube-iframe-api");

      if (!existingScript) {
        const tag = document.createElement("script");
        tag.id = "youtube-iframe-api";
        tag.src = "https://www.youtube.com/iframe_api";
        document.body.appendChild(tag);
      }

      window.onYouTubeIframeAPIReady = () => {
        createPlayer();
      };
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
    };
  }, [id, navigate]);

  return (
    <div
      style={{
        padding: "2rem",
        maxWidth: "1100px",
        margin: "0 auto",
      }}
    >
      <div
        id="yt-player"
        style={{
          width: "100%",
          height: "520px",
          borderRadius: "12px",
          overflow: "hidden",
        }}
      />
    </div>
  );
}
