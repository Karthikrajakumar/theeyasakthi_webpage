import { useEffect, useState } from "react";
import adminApi from "../services/adminApi";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [link, setLink] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const res = await adminApi.get("/posts");
      setPosts(res.data);
    } catch (err) {
      console.error("Failed to fetch posts", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!editingId && !image) {
      alert("Image is required");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("link", link);
    if (image) formData.append("image", image);

    try {
      if (editingId) {
        await adminApi.put(`/posts/${editingId}`, formData);
      } else {
        await adminApi.post("/posts", formData);
      }

      resetForm();
      fetchPosts();
    } catch (err) {
      alert("Failed to save post");
    }
  };

  const resetForm = () => {
    setTitle("");
    setContent("");
    setLink("");
    setImage(null);
    setPreview(null);
    setEditingId(null);
  };

  const handleEdit = (post) => {
    setTitle(post.title || "");
    setContent(post.content || "");
    setLink(post.link || "");
    setEditingId(post._id);

    setPreview(
      post.imageUrl
        ? `http://localhost:5000${post.imageUrl}`
        : null
    );
    setImage(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this post?")) return;
    await adminApi.delete(`/posts/${id}`);
    setPosts((prev) => prev.filter((p) => p._id !== id));
  };

  if (loading) return <p>Loading posts...</p>;

  return (
    <div className="page-scale">
      <h2>Posts Management</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          placeholder="Post title (optional)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Post content (optional)"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <input
          placeholder="External link (optional)"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files[0];
            if (!file) return;
            setImage(file);
            setPreview(URL.createObjectURL(file));
          }}
        />

        {preview && (
          <img
            src={preview}
            alt="Preview"
            style={{
              maxWidth: "240px",
              borderRadius: "8px",
              border: "1px solid #ddd",
            }}
          />
        )}

        <button type="submit" className="admin-primary-btn">
          {editingId ? "Update Post" : "Add Post"}
        </button>
      </form>

      <table style={styles.table}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Content</th>
            <th>Image</th>
            <th>Link</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {posts.length === 0 ? (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>
                No posts found
              </td>
            </tr>
          ) : (
            posts.map((post) => (
              <tr key={post._id}>
                <td>{post.title || "-"}</td>
                <td>
                  {post.content
                    ? post.content.length > 120
                      ? post.content.slice(0, 120) + "..."
                      : post.content
                    : "-"}
                </td>
                <td>{post.originalImageName || "-"}</td>
                <td>
                  {post.link ? (
                    <a href={post.link} target="_blank" rel="noreferrer">
                      Open
                    </a>
                  ) : (
                    "-"
                  )}
                </td>
                <td>
                  <button
                    onClick={() => handleEdit(post)}
                    style={styles.editBtn}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(post._id)}
                    style={styles.deleteBtn}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <style>
        {`
          .page-scale { font-size: 1.1rem; }
          .page-scale h2 { font-size: 2rem; margin-bottom: 20px; }
          .page-scale input,
          .page-scale textarea {
            font-size: 1rem;
            padding: 12px 14px;
            min-height: 44px;
          }
          .page-scale textarea { min-height: 140px; }
          .page-scale button {
            font-size: 1rem;
            padding: 12px 16px;
            min-height: 44px;
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
    flexDirection: "column",
    gap: "14px",
    marginBottom: "28px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  editBtn: {
    background: "#0284c7",
    color: "#fff",
    border: "none",
    marginRight: "10px",
    cursor: "pointer",
  },
  deleteBtn: {
    background: "#c62828",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  },
};

export default Posts;
