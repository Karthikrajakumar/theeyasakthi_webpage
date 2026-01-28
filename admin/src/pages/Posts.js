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
import { uploadToCloudinary } from "../utils/uploadToCloudinary";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [form, setForm] = useState({
    title: "",
    content: "",
    link: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);

  /* 🔄 Fetch posts */
  const fetchPosts = async () => {
    const snapshot = await getDocs(collection(db, "posts"));
    const data = snapshot.docs.map((d) => ({
      id: d.id,
      ...d.data(),
    }));
    setPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  /* ➕ ADD or ✏️ UPDATE post */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      let imageUrl = "";

      if (imageFile) {
        imageUrl = await uploadToCloudinary(imageFile);
      }

      const payload = {
        title: form.title?.trim() || "",
        content: form.content?.trim() || "",
        link: form.link?.trim() || "",
        ...(imageUrl && { imageUrl }),
      };

      if (editingId) {
        // ✏️ UPDATE
        await updateDoc(doc(db, "posts", editingId), payload);
      } else {
        // ➕ ADD
        await addDoc(collection(db, "posts"), {
          ...payload,
          imageUrl: imageUrl || "",
          createdAt: serverTimestamp(),
        });
      }

      resetForm();
      fetchPosts();
    } catch (err) {
      console.error("POST SAVE ERROR:", err);
      alert("Post save failed. Check console.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setForm({ title: "", content: "", link: "" });
    setImageFile(null);
    setEditingId(null);
  };

  /* ✏️ Edit */
  const handleEdit = (post) => {
    setForm({
      title: post.title || "",
      content: post.content || "",
      link: post.link || "",
    });
    setEditingId(post.id);
    setImageFile(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* 🗑 Delete */
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this post?")) return;
    await deleteDoc(doc(db, "posts", id));
    fetchPosts();
  };

  return (
    <div className="page-scale">
      <h2>Posts Management</h2>

      {/* 🧾 FORM CARD */}
      <div style={styles.card}>
        <h3>{editingId ? "Edit Post" : "Add New Post"}</h3>

        <form onSubmit={handleSubmit}>
          <input
            style={styles.input}
            placeholder="Post title (optional)"
            value={form.title}
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
          />

          <textarea
            style={styles.textarea}
            placeholder="Post content (optional)"
            value={form.content}
            onChange={(e) =>
              setForm({ ...form, content: e.target.value })
            }
          />

          <input
            style={styles.input}
            placeholder="External link (optional)"
            value={form.link}
            onChange={(e) =>
              setForm({ ...form, link: e.target.value })
            }
          />

          <input
            type="file"
            accept="image/*"
            style={styles.input}
            onChange={(e) => setImageFile(e.target.files[0])}
          />

          <div style={{ display: "flex", gap: 12 }}>
            <button
              type="submit"
              style={styles.primaryBtn}
              disabled={loading}
            >
              {loading
                ? "Saving..."
                : editingId
                ? "Update Post"
                : "Add Post"}
            </button>

            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                style={styles.cancelBtn}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* 📋 POSTS TABLE */}
      <div style={{ marginTop: 40 }}>
        <h3>All Posts</h3>

        {posts.length === 0 ? (
          <p>No posts yet.</p>
        ) : (
          <div style={styles.tableWrapper}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Title</th>
                  <th style={styles.th}>Content</th>
                  <th style={styles.th}>Image</th>
                  <th style={styles.th}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => (
                  <tr key={post.id}>
                    <td style={styles.tdTitle}>
                      {post.title || "—"}
                    </td>
                    <td style={styles.tdContent}>
                      {post.content
                        ? post.content.length > 120
                          ? post.content.slice(0, 120) + "..."
                          : post.content
                        : "—"}
                    </td>
                    <td style={styles.td}>
                      {post.imageUrl ? (
                        <img
                          src={post.imageUrl}
                          alt="post"
                          style={{ width: 80, borderRadius: 6 }}
                        />
                      ) : (
                        "—"
                      )}
                    </td>
                    <td style={styles.td}>
                      <div style={{ display: "flex", gap: 8 }}>
                        <button
                          style={styles.editBtn}
                          onClick={() => handleEdit(post)}
                        >
                          Edit
                        </button>
                        <button
                          style={styles.deleteBtn}
                          onClick={() => handleDelete(post.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
 card: {
  background: "#fff",
  padding: "36px",
  borderRadius: "12px",
  border: "1px solid #e5e7eb",
  marginBottom: "40px",
  maxWidth: "900px",
},

input: {
  width: "100%",
  marginBottom: "18px",
  borderRadius: "8px",
  border: "1px solid #d1d5db",
  padding: "14px 16px",
  fontSize: "16px",
},

textarea: {
  width: "100%",
  marginBottom: "18px",
  borderRadius: "8px",
  border: "1px solid #d1d5db",
  padding: "14px 16px",
  fontSize: "16px",
  minHeight: "180px",
},


  /* 🔵 SAME AS BLOGS */
primaryBtn: {
  background: "#2563eb",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  padding: "14px 26px",
  fontSize: "16px",
},


  /* ❌ CANCEL (Blogs doesn't have but keep consistent) */
  cancelBtn: {
    background: "#9ca3af",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    padding: "12px 18px",
  },

  /* 🟦 SAME EDIT COLOR AS BLOGS */
  editBtn: {
    background: "#0284c7",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    padding: "8px 14px",
    marginRight: "10px",
  },

  /* 🔴 SAME DELETE COLOR AS BLOGS */
  deleteBtn: {
    background: "#dc2626",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    padding: "8px 14px",
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
    padding: "14px 16px",
  },

  td: {
    borderBottom: "1px solid #e5e7eb",
    padding: "14px 16px",
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
};

export default Posts;
