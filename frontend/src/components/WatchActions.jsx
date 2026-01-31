import { useEffect, useRef, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { FaWhatsapp, FaXTwitter, FaFacebook, FaLink } from "react-icons/fa6";
import { db } from "../firebase/firebase";

export default function WatchActions({ itemId, type, videoUrl }) {
  const [reaction, setReaction] = useState(null);
  const [openShare, setOpenShare] = useState(false);
  const shareRef = useRef(null);

  const docId = `${type}_${itemId}`;

  // 🔄 Load reaction from Firestore
  useEffect(() => {
    const loadReaction = async () => {
      try {
        const snap = await getDoc(doc(db, "reactions", docId));
        if (snap.exists()) {
          setReaction(snap.data().reaction || null);
        }
      } catch (err) {
        console.error("Failed to load reaction", err);
      }
    };

    loadReaction();
  }, [docId]);

  // 👍👎 Update reaction in Firestore
  const updateReaction = async (value) => {
    const newValue = reaction === value ? null : value;
    setReaction(newValue);

    try {
      await setDoc(
        doc(db, "reactions", docId),
        { reaction: newValue },
        { merge: true }
      );
    } catch (err) {
      console.error("Failed to update reaction", err);
    }
  };

  // ❌ Close share popup on outside click (UNCHANGED)
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
        className={`action-btn ${reaction === "dislike" ? "active dislike" : ""
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
              <FaWhatsapp /> WhatsApp
            </a>
            <a
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                videoUrl
              )}`}
              target="_blank"
              rel="noreferrer"
            >
              <FaXTwitter /> X
            </a>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                videoUrl
              )}`}
              target="_blank"
              rel="noreferrer"  
            >
              <FaFacebook /> Facebook
            </a>
            <button onClick={() => navigator.clipboard.writeText(videoUrl)}>
              <FaLink /> Copy Link
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
