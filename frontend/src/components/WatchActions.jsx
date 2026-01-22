import { useEffect, useRef, useState } from "react";

export default function WatchActions({ itemId, type, videoUrl }) {
  const [reaction, setReaction] = useState(null);
  const [openShare, setOpenShare] = useState(false);
  const shareRef = useRef(null);

  // Load reaction from DB
  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_API_URL}/api/reactions/${type}/${itemId}`
    )
      .then((res) => res.json())
      .then((data) => setReaction(data?.reaction || null));
  }, [itemId, type]);

  const updateReaction = (value) => {
    const newValue = reaction === value ? null : value;
    setReaction(newValue);

    fetch(
      `${process.env.REACT_APP_API_URL}/api/reactions/${type}/${itemId}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reaction: newValue }),
      }
    );
  };

  // Close share popup on outside click
  useEffect(() => {
    const handler = (e) => {
      if (shareRef.current && !shareRef.current.contains(e.target)) {
        setOpenShare(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="video-actions">
      <button
        className={`action-btn ${reaction === "like" ? "active like" : ""}`}
        onClick={() => updateReaction("like")}
      >
        👍 Like
      </button>

      <button
        className={`action-btn ${
          reaction === "dislike" ? "active dislike" : ""
        }`}
        onClick={() => updateReaction("dislike")}
      >
        👎 Dislike
      </button>

      <div className="share-container" ref={shareRef}>
        <button
          className="action-btn"
          onClick={() => setOpenShare((p) => !p)}
        >
          🔗 Share
        </button>

        {openShare && (
          <div className="share-menu pro">
            <a
              href={`https://wa.me/?text=${encodeURIComponent(videoUrl)}`}
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp
            </a>
            <a
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                videoUrl
              )}`}
              target="_blank"
              rel="noreferrer"
            >
              X
            </a>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                videoUrl
              )}`}
              target="_blank"
              rel="noreferrer"
            >
              Facebook
            </a>
            <button onClick={() => navigator.clipboard.writeText(videoUrl)}>
              Copy Link
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
