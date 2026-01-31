import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import PageTransition from "../PageTransition";
import SearchBar from "../components/SearchBar";

// ✅ ADD THESE TWO IMPORTS
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";

export default function Podcasts() {
  const [podcasts, setPodcasts] = useState([]);
  const [query, setQuery] = useState("");
  const [hoveredId, setHoveredId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const podcastsPerPage = 6;

  useEffect(() => {
    const fetchItems = async () => {
      const snap = await getDocs(collection(db, "podcasts"));
      setPodcasts(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    };
    fetchItems();
  }, []);

  const filtered = podcasts.filter((p) =>
    p.title.toLowerCase().includes(query.toLowerCase())
  );

  // Calculate pagination
  const totalPages = Math.ceil(filtered.length / podcastsPerPage);
  const startIdx = (currentPage - 1) * podcastsPerPage;
  const endIdx = startIdx + podcastsPerPage;
  const paginatedPodcasts = filtered.slice(startIdx, endIdx);

  // Reset to page 1 when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [query]);

  return (
    <PageTransition>
      <Container>
        <div className="page-header">
          <h1>Podcasts</h1>
          <SearchBar
            value={query}
            onChange={setQuery}
            placeholder="Search podcasts..."
          />
        </div>

        <div className="video-grid">
          {paginatedPodcasts.map((p) => (
            <article key={p.id} className="video-card">
              <div
                className="video-wrapper"
                onMouseEnter={() => setHoveredId(p.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <Link to={`/podcasts/${p.id}`} className="video-link-overlay" />

                {hoveredId === p.id ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${p.videoId}?autoplay=1&mute=1&controls=0&playsinline=1`}
                    title={p.title}
                    allow="autoplay; encrypted-media"
                    frameBorder="0"
                    className="preview-iframe"
                  />
                ) : (
                  <img
                    src={`https://img.youtube.com/vi/${p.videoId}/hqdefault.jpg`}
                    alt={p.title}
                  />
                )}

                <span className="play-overlay">▶</span>
              </div>

              <h2 className="video-title">{p.title}</h2>
              <div className="video-meta">{p.host}</div>
            </article>
          ))}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="pagination">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                className={`pagination-btn ${currentPage === page ? "active" : ""}`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}
          </div>
        )}
      </Container>

      <style>{`
        .pagination {
          display: flex;
          justify-content: center;
          gap: 10px;
          margin: 40px 0;
          flex-wrap: wrap;
        }

        .pagination-btn {
          min-width: 40px;
          height: 40px;
          padding: 8px 12px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          background: rgba(255, 0, 0, 0.1);
          color: #fff;
          border-radius: 8px;
          cursor: pointer;
          font-size: 14px;
          font-weight: 600;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .pagination-btn:hover {
          background: rgba(255, 0, 0, 0.3);
          border-color: rgba(255, 255, 255, 0.5);
          transform: translateY(-2px);
        }

        .pagination-btn.active {
          background: linear-gradient(135deg, #ff0000, #ffffff);
          border-color: #ff0000;
          color: #fff;
          box-shadow: 0 4px 15px rgba(255, 0, 0, 0.4);
        }

        @media (max-width: 768px) {
          .pagination {
            gap: 8px;
          }

          .pagination-btn {
            min-width: 36px;
            height: 36px;
            font-size: 12px;
            padding: 6px 10px;
          }
        }
      `}</style>
    </PageTransition>
  );
}
