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

const extractVideoId = (url) =>
  url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  )?.[1];

const Songs = () => {
  const [songs, setSongs] = useState([]);
  const [title, setTitle] = useState("");
  const [host, setHost] = useState("");
  const [url, setUrl] = useState("");
  const [editingId, setEditingId] = useState(null);

  const fetchSongs = async () => {
    const snap = await getDocs(collection(db, "songs"));
    setSongs(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
  };

  useEffect(() => {
    fetchSongs();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const videoId = extractVideoId(url);
    if (!videoId) return alert("Invalid YouTube URL");

    const payload = { title, host, videoId, updatedAt: serverTimestamp() };

    if (editingId) {
      await updateDoc(doc(db, "songs", editingId), payload);
    } else {
      await addDoc(collection(db, "songs"), {
        ...payload,
        createdAt: serverTimestamp(),
      });
    }

    setTitle("");
    setHost("");
    setUrl("");
    setEditingId(null);
    fetchSongs();
  };

  const handleEdit = (song) => {
    setTitle(song.title);
    setHost(song.host);
    setUrl(`https://www.youtube.com/watch?v=${song.videoId}`);
    setEditingId(song.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this song?")) return;
    await deleteDoc(doc(db, "songs", id));
    setSongs((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <div className="page-scale">
      <h2>Songs Management</h2>

      {/* ➕ FORM */}
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          placeholder="Song title"
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
          {editingId ? "Update Song" : "Add Song"}
        </button>
      </form>

      {/* 📋 TABLE */}
      {songs.length === 0 ? (
        <p>No songs found.</p>
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
            {songs.map((song) => (
              <tr key={song.id}>
                <td>{song.title}</td>
                <td>{song.host}</td>
                <td>
                  <button
                    onClick={() => handleEdit(song)}
                    style={styles.editBtn}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(song.id)}
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

export default Songs;
