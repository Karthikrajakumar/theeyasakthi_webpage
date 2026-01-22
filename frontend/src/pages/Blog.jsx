import { useEffect, useState } from "react";
import PageTransition from "../PageTransition";

export default function Blog() {
  const [posts, setPosts] = useState([]);

  // 🔄 Fetch blogs from backend (admin-controlled)
  useEffect(() => {
    fetch("http://localhost:5000/api/blogs")
      .then((res) => res.json())
      .then((data) => {
        // Map backend blogs to frontend structure (NO layout change)
        const mapped = data.map((b) => ({
          text: b.content,
          link: b.youtubeLink,
          date: b.createdAt
            ? new Date(b.createdAt).toLocaleDateString("en-GB")
            : "",
          upload: b.createdAt
            ? new Date(b.createdAt).toLocaleDateString("en-GB")
            : "",
        }));
        setPosts(mapped);
      })
      .catch((err) => console.error("Failed to fetch blogs", err));
  }, []);

  // extract video id from normal + shorts + youtu.be
  const getVideoId = (url) => {
    try {
      if (!url) return "";
      if (url.includes("shorts/")) {
        return url.split("shorts/")[1].split("?")[0];
      }
      if (url.includes("watch?v=")) {
        return url.split("watch?v=")[1].split("&")[0];
      }
      if (url.includes("youtu.be/")) {
        return url.split("youtu.be/")[1].split("?")[0];
      }
    } catch {}
    return "";
  };

  return (
    <PageTransition>
      <section className="blog-hero">
        <h1>BLOG PAGE</h1>
        <p className="blog-subtitle">
          Editorial insights and perspectives.
        </p>
      </section>

      <section className="blog-container">
        {posts.map((p, i) => {
          const vid = getVideoId(p.link);
          const thumb = vid
            ? `https://img.youtube.com/vi/${vid}/hqdefault.jpg`
            : "";

          return (
            <div key={i} className="blog-card">

              {/* TEXT FIRST */}
              <p className="blog-text">{p.text}</p>

              {/* THUMBNAIL */}
              {vid && (
                <a href={p.link} target="_blank" rel="noopener noreferrer">
                  <img
                    src={thumb}
                    className="blog-thumb"
                    alt="YouTube thumbnail"
                  />
                </a>
              )}

              {/* LINK */}
              {p.link && (
                <p className="blog-link">
                  <strong>Link:</strong>{" "}
                  <a href={p.link} target="_blank" rel="noopener noreferrer">
                    {p.link}
                  </a>
                </p>
              )}

              {/* DATE AT THE BOTTOM */}
              <p className="meta">
                <strong>Date:</strong> {p.date}
              </p>
              <p className="meta">
                <strong>Uploaded:</strong> {p.upload}
              </p>

            </div>
          );
        })}
      </section>
    </PageTransition>
  );
}
