import { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase/firebase";

// 🔗 Extract YouTube video ID
const extractVideoId = (url) => {
  const regex =
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : "";
};

const Podcasts = () => {
  const [podcasts, setPodcasts] = useState([]);
  const [title, setTitle] = useState("");
  const [host, setHost] = useState("");
  const [url, setUrl] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);

  // 📥 FETCH PODCASTS
  const fetchPodcasts = async () => {
    const snapshot = await getDocs(collection(db, "podcasts"));
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setPodcasts(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchPodcasts();
  }, []);

  // ➕ ADD / ✏️ UPDATE PODCAST
  const handleSubmit = async (e) => {
    e.preventDefault();

    const videoId = extractVideoId(url);
    if (!videoId) {
      alert("Invalid YouTube URL");
      return;
    }

    const payload = {
      title,
      host,
      videoId,
      updatedAt: serverTimestamp(),
    };

    if (editingId) {
      await updateDoc(doc(db, "podcasts", editingId), payload);
    } else {
      await addDoc(collection(db, "podcasts"), {
        ...payload,
        createdAt: serverTimestamp(),
      });
    }

    resetForm();
    fetchPodcasts();
  };

  // ✏️ EDIT
  const handleEdit = (podcast) => {
    setTitle(podcast.title);
    setHost(podcast.host);
    setUrl(`https://www.youtube.com/watch?v=${podcast.videoId}`);
    setEditingId(podcast.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // 🗑️ DELETE
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this podcast?")) return;
    await deleteDoc(doc(db, "podcasts", id));
    setPodcasts((prev) => prev.filter((p) => p.id !== id));
  };

  const resetForm = () => {
    setTitle("");
    setHost("");
    setUrl("");
    setEditingId(null);
  };

  if (loading) return <p>Loading podcasts...</p>;

  return (
    <div className="page-scale">
      <h2>Podcasts Management</h2>

      {/* ➕ ADD / EDIT FORM */}
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          placeholder="Podcast Title"
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

        <button type="submit" className="admin-primary-btn">
          {editingId ? "Update Podcast" : "Add Podcast"}
        </button>
      </form>

      {/* 📋 TABLE */}
      {podcasts.length === 0 ? (
        <p>No podcasts found.</p>
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
            {podcasts.map((podcast) => (
              <tr key={podcast.id}>
                <td>{podcast.title}</td>
                <td>{podcast.host}</td>
                <td>
                  <button
                    onClick={() => handleEdit(podcast)}
                    style={styles.editBtn}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(podcast.id)}
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

      {/* 🎨 SAME SCALE STYLES AS POSTS */}
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
            transition:
              background-color 0.25s ease,
              transform 0.2s ease,
              box-shadow 0.2s ease;
          }

          .admin-primary-btn:hover {
            background: #1d4ed8;
            transform: translateY(-2px);
            box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
          }

          .admin-primary-btn:active {
            transform: translateY(0);
            box-shadow: 0 3px 8px rgba(0, 0, 0, 0.12);
          }
        `}
      </style>
    </div>
  );
};

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
    background: "#c62828",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  },
};

export default Podcasts;
