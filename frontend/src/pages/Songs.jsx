import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import PageTransition from "../PageTransition";
import SearchBar from "../components/SearchBar";

export default function Songs() {
  const [songs, setSongs] = useState([]);
  const [query, setQuery] = useState("");
  const [hoveredId, setHoveredId] = useState(null);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/songs`)
      .then(res => res.json())
      .then(data => setSongs(data));
  }, []);

  const filtered = songs.filter((s) =>
    s.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <PageTransition>
      <Container>
        <div className="page-header">
          <h1>Songs</h1>
          <SearchBar
            value={query}
            onChange={setQuery}
            placeholder="Search songs..."
          />
        </div>

        <div className="video-grid">
          {filtered.map((s) => (
            <article key={s._id} className="video-card">
              <div
                className="video-wrapper"
                onMouseEnter={() => setHoveredId(s._id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <Link
                  to={`/songs/${s._id}`}
                  className="video-link-overlay"
                />

                {hoveredId === s._id ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${s.videoId}?autoplay=1&mute=1&controls=0&playsinline=1`}
                    title={s.title}
                    allow="autoplay; encrypted-media"
                    frameBorder="0"
                    className="preview-iframe"
                  />
                ) : (
                  <img
                    src={`https://img.youtube.com/vi/${s.videoId}/hqdefault.jpg`}
                    alt={s.title}
                  />
                )}

                <span className="play-overlay">▶</span>
              </div>

              <h2 className="video-title">{s.title}</h2>
              <div className="video-meta">{s.host}</div>
            </article>
          ))}
        </div>
      </Container>
    </PageTransition>
  );
}
