import { useEffect, useState } from "react";
import adminApi from "../services/adminApi";

const extractVideoId = (url) => {
  const regex =
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : "";
};

const Songs = () => {
  const [songs, setSongs] = useState([]);
  const [title, setTitle] = useState("");
  const [host, setHost] = useState("");
  const [url, setUrl] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchSongs = async () => {
    try {
      const res = await adminApi.get("/songs");
      setSongs(res.data);
    } catch (err) {
      console.error("Failed to fetch songs", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSongs();
  }, []);

  const handleAddSong = async (e) => {
    e.preventDefault();

    const videoId = extractVideoId(url);
    if (!videoId) {
      alert("Invalid YouTube URL");
      return;
    }

    try {
      if (editingId) {
        await adminApi.put(`/songs/${editingId}`, {
          title,
          host,
          videoId,
        });
      } else {
        await adminApi.post("/songs", {
          title,
          host,
          videoId,
        });
      }

      setTitle("");
      setHost("");
      setUrl("");
      setEditingId(null);
      fetchSongs();
    } catch {
      alert("Failed to save song");
    }
  };

  const handleEdit = (song) => {
    setTitle(song.title);
    setHost(song.host);
    setUrl(`https://www.youtube.com/watch?v=${song.videoId}`);
    setEditingId(song._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this song?")) return;
    await adminApi.delete(`/songs/${id}`);
    setSongs((prev) => prev.filter((s) => s._id !== id));
  };

  if (loading) return <p>Loading songs...</p>;

  return (
    <div className="page-scale">
      <h2>Songs Management</h2>

      {/* ➕ ADD / EDIT FORM */}
      <form onSubmit={handleAddSong} style={styles.form}>
        <input
          placeholder="Song Title"
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
  {editingId ? "Update Song" : "Add Song"}
</button>

      </form>

      {/* 📋 SONGS TABLE */}
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
              <tr key={song._id}>
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
                    onClick={() => handleDelete(song._id)}
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

      {/* 🎨 PAGE SCALE STYLES */}
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

export default Songs;
