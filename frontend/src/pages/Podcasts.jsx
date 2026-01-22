import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import PageTransition from "../PageTransition";
import SearchBar from "../components/SearchBar";

export default function Podcasts() {
  const [podcasts, setPodcasts] = useState([]);
  const [query, setQuery] = useState("");
  const [hoveredId, setHoveredId] = useState(null);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/podcasts`)
      .then((res) => res.json())
      .then((data) => setPodcasts(data));
  }, []);

  const filtered = podcasts.filter((p) =>
    p.title.toLowerCase().includes(query.toLowerCase())
  );

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
          {filtered.map((p) => (
            <article key={p._id} className="video-card">
              <div
                className="video-wrapper"
                onMouseEnter={() => setHoveredId(p._id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {/* click overlay */}
                <Link
                  to={`/podcasts/${p._id}`}
                  className="video-link-overlay"
                />

                {hoveredId === p._id ? (
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
      </Container>
    </PageTransition>
  );
}
