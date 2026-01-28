import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../firebase/firebase";
import PageTransition from "../PageTransition";

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [expandedPosts, setExpandedPosts] = useState({});

  useEffect(() => {
    const fetchBlogs = async () => {
      const q = query(collection(db, "blogs"), orderBy("createdAt", "desc"));
      const snap = await getDocs(q);

      const mapped = snap.docs.map((d) => {
        const b = d.data();
        return {
          title: b.title || "",
          text: b.content,
          link: b.youtubeLink,
          date: b.createdAt?.toDate().toLocaleDateString("en-GB"),
          upload: b.createdAt?.toDate().toLocaleDateString("en-GB"),
        };
      });

      setPosts(mapped);
    };

    fetchBlogs();
  }, []);

  const getVideoId = (url) => {
    try {
      if (!url) return "";
      if (url.includes("shorts/")) return url.split("shorts/")[1].split("?")[0];
      if (url.includes("watch?v=")) return url.split("watch?v=")[1].split("&")[0];
      if (url.includes("youtu.be/")) return url.split("youtu.be/")[1];
    } catch { }
    return "";
  };

  const toggleExpand = (index) => {
    setExpandedPosts(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const shouldShowSeeMore = (text) => {
    if (!text) return false;
    // Show see more if text has more than 50 words or 300 characters
    const wordCount = text.trim().split(/\s+/).length;
    return wordCount > 50 || text.length > 300;
  };

  return (
    <PageTransition>
      <div className="blog-page-header">
        <h1>BLOG PAGE</h1>
      </div>
      {/* UI UNCHANGED */}
      <section className="blog-container">
        {posts.map((p, i) => {
          const vid = getVideoId(p.link);
          const thumb = vid
            ? `https://img.youtube.com/vi/${vid}/hqdefault.jpg`
            : "";

          return (
            <div key={i} className="blog-card">
              {vid && (
                <a href={p.link} target="_blank" rel="noreferrer">
                  <img src={thumb} className="blog-thumb" alt="" />
                </a>
              )}

              {p.title && (
                <h3 className="blog-title">{p.title}</h3>
              )}

              {p.link && (
                <p className="blog-link">
                  <a href={p.link} target="_blank" rel="noreferrer">
                    {p.link}
                  </a>
                </p>
              )}

              <p className={`blog-text ${expandedPosts[i] ? 'expanded' : ''}`}>
                {p.text}
              </p>
              
              {!expandedPosts[i] && shouldShowSeeMore(p.text) && (
                <span className="see-more-btn" onClick={() => toggleExpand(i)}>
                  see more...
                </span>
              )}

              {expandedPosts[i] && (
                <span className="see-more-btn" onClick={() => toggleExpand(i)}>
                  show less
                </span>
              )}

              <p className="meta">Date: {p.date}</p>
              <p className="meta">Uploaded: {p.upload}</p>
            </div>
          );
        })}
      </section>

      <style>{`
        .blog-page-header {
          text-align: center;
          padding: 40px 20px;
          margin-bottom: 40px;
        }

        .blog-page-header h1 {
          font-size: 2rem;
          font-weight: 700;
          color: #fff;
          margin: 0;
          letter-spacing: 2px;
          text-transform: uppercase;
        }

        @media (max-width: 768px) {
          .blog-page-header h1 {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </PageTransition>
  );
}
