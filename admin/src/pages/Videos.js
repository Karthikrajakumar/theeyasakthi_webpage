import { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import { syncYouTubeVideos } from "../services/syncYouTubeVideos";

const extractVideoId = (url) =>
  url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  )?.[1];

const Videos = () => {
  const [videos, setVideos] = useState([]);
  const [title, setTitle] = useState("");
  const [host, setHost] = useState("");
  const [url, setUrl] = useState("");
  const [editingId, setEditingId] = useState(null);

  const fetchVideos = async () => {
    const snap = await getDocs(collection(db, "videos"));
    setVideos(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const videoId = extractVideoId(url);
    if (!videoId) return alert("Invalid YouTube URL");

    const payload = { title, host, videoId, updatedAt: serverTimestamp() };

    if (editingId) {
      await updateDoc(doc(db, "videos", editingId), payload);
    } else {
      await addDoc(collection(db, "videos"), {
        ...payload,
        createdAt: serverTimestamp(),
      });
    }

    setTitle("");
    setHost("");
    setUrl("");
    setEditingId(null);
    fetchVideos();
  };

  const handleEdit = (video) => {
    setTitle(video.title);
    setHost(video.host);
    setUrl(`https://www.youtube.com/watch?v=${video.videoId}`);
    setEditingId(video.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this video?")) return;
    await deleteDoc(doc(db, "videos", id));
    setVideos((prev) => prev.filter((v) => v.id !== id));
  };

  return (
    <div className="page-scale">
      <h2>Videos Management</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          placeholder="Video title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          placeholder="Host"
          value={host}
          onChange={(e) => setHost(e.target.value)}
          required
        />
        <input
          placeholder="YouTube URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />

        <button className="admin-primary-btn">
          {editingId ? "Update Video" : "Add Video"}
        </button>
      </form>
      <button
        onClick={syncYouTubeVideos}
        style={{
          background: "#ff0055",
          color: "#fff",
          padding: "10px 16px",
          borderRadius: "6px",
          border: "none",
          cursor: "pointer",
          marginBottom: "16px",
          fontWeight: "bold",
        }}
      >
        🔄 Sync Latest YouTube Videos
      </button>

      {videos.length === 0 ? (
        <p>No videos found.</p>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Host</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {videos.map((video) => (
              <tr key={video.id}>
                <td>{video.title}</td>
                <td>{video.host}</td>
                <td>
                  <button
                    onClick={() => handleEdit(video)}
                    style={styles.editBtn}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(video.id)}
                    style={styles.deleteBtn}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {sharedStyles}
    </div>
  );
};

/* ✅ REQUIRED STYLES (same as Podcasts) */
const styles = {
  form: {
    display: "flex",
    gap: "14px",
    marginBottom: "28px",
    flexWrap: "wrap",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  editBtn: {
    background: "#0284c7",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    marginRight: "10px",
  },
  deleteBtn: {
    background: "#dc2626",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  },
};

const sharedStyles = (
  <style>
    {`
      .page-scale {
        font-size: 1.1rem;
      }
      .page-scale h2 {
        font-size: 2rem;
        margin-bottom: 20px;
      }
      .page-scale input {
        font-size: 1rem;
        padding: 12px 14px;
        min-height: 44px;
      }
      .page-scale button {
        font-size: 1rem;
        padding: 12px 16px;
        min-height: 44px;
        border-radius: 6px;
      }
      .page-scale table th,
      .page-scale table td {
        font-size: 1rem;
        padding: 14px 16px;
      }
      .admin-primary-btn {
        background: #2563eb;
        color: #fff;
        border: none;
        border-radius: 6px;
        cursor: pointer;
      }
      .admin-primary-btn:hover {
        background: #1d4ed8;
      }
    `}
  </style>
);

export default Videos;
