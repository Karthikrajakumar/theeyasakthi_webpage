import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import PageTransition from "../PageTransition";
import SearchBar from "../components/SearchBar";

export default function Videos() {
  const [videos, setVideos] = useState([]);
  const [query, setQuery] = useState("");
  const [hoveredId, setHoveredId] = useState(null);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/videos`)
      .then((res) => res.json())
      .then((data) => setVideos(data));
  }, []);

  const filtered = videos.filter((v) =>
    v.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <PageTransition>
      <Container>
        <div className="page-header">
          <h1>Videos</h1>
          <SearchBar
            value={query}
            onChange={setQuery}
            placeholder="Search videos..."
          />
        </div>

        <div className="video-grid">
          {filtered.map((v) => (
            <article key={v._id} className="video-card">
             <div
  className="video-wrapper"
  onMouseEnter={() => setHoveredId(v._id)}
  onMouseLeave={() => setHoveredId(null)}
>
  <Link to={`/videos/${v._id}`} className="video-link-overlay" />

  {hoveredId === v._id ? (
    <iframe
      src={`https://www.youtube.com/embed/${v.videoId}?autoplay=1&mute=1&controls=0&playsinline=1`}
      title={v.title}
      allow="autoplay; encrypted-media"
      frameBorder="0"
      className="preview-iframe"
    />
  ) : (
    <img
      src={`https://img.youtube.com/vi/${v.videoId}/hqdefault.jpg`}
      alt={v.title}
    />
  )}

  <span className="play-overlay">▶</span>
</div>


              <h2 className="video-title">{v.title}</h2>
              <div className="video-meta">{v.host}</div>
            </article>
          ))}
        </div>
      </Container>
    </PageTransition>
  );
}
