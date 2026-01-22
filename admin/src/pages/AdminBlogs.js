import { useEffect, useState } from "react";

const API_URL = "http://localhost:5000/api/blogs";

const AdminBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [form, setForm] = useState({
    title: "",
    content: "",
    youtubeLink: ""
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  // 🔄 Fetch blogs
  const fetchBlogs = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setBlogs(data);
    } catch (err) {
      console.error("Failed to fetch blogs", err);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // ➕ Add / ✏️ Update blog
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title.trim() || !form.content.trim()) {
      alert("Title and content are required");
      return;
    }

    try {
      setLoading(true);

      const url = editingId ? `${API_URL}/${editingId}` : API_URL;
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      if (!res.ok) throw new Error("Save failed");

      setForm({ title: "", content: "", youtubeLink: "" });
      setEditingId(null);
      fetchBlogs();
    } catch (err) {
      console.error(err);
      alert("Failed to save blog");
    } finally {
      setLoading(false);
    }
  };

  // ✏️ Edit
  const handleEdit = (blog) => {
    setForm({
      title: blog.title || "",
      content: blog.content || "",
      youtubeLink: blog.youtubeLink || ""
    });
    setEditingId(blog._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // 🗑 Delete
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this blog?")) return;

    try {
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      fetchBlogs();
    } catch (err) {
      console.error(err);
      alert("Failed to delete blog");
    }
  };

  return (
    <div className="page-scale">
      <h2>Blogs Management</h2>

      {/* FORM */}
      <div style={styles.card}>
        <h3>{editingId ? "Edit Blog" : "Add New Blog"}</h3>

        <form onSubmit={handleSubmit}>
          <input
            style={styles.input}
            placeholder="Blog title"
            value={form.title}
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
            required
          />

          <textarea
            style={styles.textarea}
            placeholder="Blog content"
            value={form.content}
            onChange={(e) =>
              setForm({ ...form, content: e.target.value })
            }
            required
          />

          <input
            style={styles.input}
            placeholder="YouTube link"
            value={form.youtubeLink}
            onChange={(e) =>
              setForm({ ...form, youtubeLink: e.target.value })
            }
          />

          <button style={styles.primaryBtn} type="submit" disabled={loading}>
            {loading
              ? "Saving..."
              : editingId
              ? "Update Blog"
              : "Add Blog"}
          </button>
        </form>
      </div>

      {/* TABLE */}
      <div style={{ marginTop: 40 }}>
        <h3>All Blogs</h3>

        {blogs.length === 0 ? (
          <p>No blogs yet.</p>
        ) : (
          <div style={styles.tableWrapper}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Title</th>
                  <th style={styles.th}>Content</th>
                  <th style={styles.th}>YouTube</th>
                  <th style={styles.th}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {blogs.map((blog) => (
                  <tr key={blog._id}>
                    <td style={styles.tdTitle}>{blog.title}</td>

                    <td style={styles.tdContent}>
                      {blog.content.length > 120
                        ? blog.content.slice(0, 120) + "..."
                        : blog.content}
                    </td>

                    <td style={styles.td}>
                      {blog.youtubeLink ? (
                        <a
                          href={blog.youtubeLink}
                          target="_blank"
                          rel="noreferrer"
                          style={styles.link}
                        >
                          Open
                        </a>
                      ) : (
                        "-"
                      )}
                    </td>

                    <td style={styles.td}>
                      <button
                        style={styles.editBtn}
                        onClick={() => handleEdit(blog)}
                      >
                        Edit
                      </button>
                      <button
                        style={styles.deleteBtn}
                        onClick={() => handleDelete(blog._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* 🔍 PAGE SCALE STYLES (same as before) */}
      <style>
        {`
          .page-scale {
            font-size: 1.1rem;
          }

          .page-scale h2 {
            font-size: 2rem;
            margin-bottom: 20px;
          }

          .page-scale h3 {
            font-size: 1.4rem;
            margin-bottom: 16px;
          }

          .page-scale input,
          .page-scale textarea {
            font-size: 1rem;
            padding: 12px 14px;
            min-height: 44px;
          }

          .page-scale textarea {
            min-height: 160px;
          }

          .page-scale button {
            font-size: 1rem;
            padding: 12px 18px;
            min-height: 44px;
          }

          .page-scale table th,
          .page-scale table td {
            font-size: 1rem;
            padding: 14px 16px;
          }
        `}
      </style>
    </div>
  );
};

/* 🎨 Styles */
const styles = {
  card: {
    background: "#fff",
    padding: "28px",
    borderRadius: "10px",
    border: "1px solid #e5e7eb",
    marginBottom: "30px",
  },
  input: {
    width: "100%",
    marginBottom: "14px",
    borderRadius: "6px",
    border: "1px solid #d1d5db",
  },
  textarea: {
    width: "100%",
    marginBottom: "14px",
    borderRadius: "6px",
    border: "1px solid #d1d5db",
  },
  primaryBtn: {
    background: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  tableWrapper: {
    overflowX: "auto",
    background: "#fff",
    borderRadius: "10px",
    border: "1px solid #e5e7eb",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  th: {
    textAlign: "left",
    background: "#f9fafb",
    borderBottom: "1px solid #e5e7eb",
  },
  td: {
    borderBottom: "1px solid #e5e7eb",
    verticalAlign: "top",
  },
  tdTitle: {
    fontWeight: "600",
    width: "20%",
  },
  tdContent: {
    width: "45%",
    color: "#374151",
  },
  link: {
    color: "#2563eb",
    textDecoration: "none",
  },
  editBtn: {
    background: "#0284c7",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    marginRight: "10px",
  },
  deleteBtn: {
    background: "#dc2626",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

export default AdminBlogs;
