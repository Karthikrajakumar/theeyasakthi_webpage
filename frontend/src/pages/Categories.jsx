import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";


export default function Categories() {
  const videos = [
    {
      id: 1,
      embed: "https://www.youtube.com/embed/L2jceMXxe6o",
      title:
        "பதில் சொல்லுங்க அப்பா! உங்க பொண்ணுக்கு இப்படி நடந்தா சும்மா இருப்பீர்களா? | DMK Fails | MK Stalin",
      author: "DMK TheeyaSakthi Admin",
      date: "November 3, 2025",
      comments: 0,
    },
    {
      id: 2,
      embed: "https://www.youtube-nocookie.com/embed/Q7IwjVlgLbU",
      title:
        "உஷார் மக்களே! குறுக்கு புத்தி திமுக கும்பகோணத்தை ஏன் குறிவைக்குது? | DMK Troll | THEEYASAKTHI DMK",
      author: "DMK TheeyaSakthi Admin",
      date: "November 3, 2025",
      comments: 0,
    },
    {
      id: 3,
      embed: "https://www.youtube-nocookie.com/embed/t_oIjqYRr0I",
      title:
        "திமுகவின் துரோகப்பத்திரிக்கை, பேசப்படாத அரசியல் உண்மைகள் | DMK | MK Stalin | Udhayanidhi",
      author: "DMK TheeyaSakthi Admin",
      date: "November 3, 2025",
      comments: 0,
    },
    {
      id: 4,
      embed: "https://www.youtube-nocookie.com/embed/up4TuGdM5SQ",
      title:
        "THIRUTTU OOZHAL திமுக - மக்களை பற்றின 🤔 நியாபகம் இருக்கா 😂 RAP SONG | DMK SPOOF",
      author: "DMK TheeyaSakthi Admin",
      date: "November 3, 2025",
      comments: 0,
    },
    {
      id: 5,
      embed: "https://www.youtube-nocookie.com/embed/c5TPV7yV3ko",
      title:
        "வெல்லும் தமிழ்ப் பெண்கள்❌ கொல்லும் தமிழ்ப் பெண்கள்✅ | DMK STALIN | THEEYASAKTHI DMK",
      author: "DMK TheeyaSakthi Admin",
      date: "November 3, 2025",
      comments: 0,
    },
    {
      id: 6,
      embed: "https://www.youtube-nocookie.com/embed/0hjqWmnUDWo",
      title:
        "APPAN PULLA ROMBA THOLLA | ENGEY NIMMATHI DMK VERSION | DMK TROLL SONG | MK STALIN",
      author: "DMK TheeyaSakthi Admin",
      date: "November 3, 2025",
      comments: 0,
    },
    {
      id: 7,
      embed: "https://www.youtube-nocookie.com/embed/QaAV3XFRum0",
      title:
        "CM-மா இருந்தாங்க அம்மா, DMK-லாம் 😂 சும்மா தரமான 5 சம்பவங்கள்! | AMMA | DMK | MKSTALIN | DMK Troll",
      author: "DMK TheeyaSakthi Admin",
      date: "November 3, 2025",
      comments: 0,
    },
    {
      id: 8,
      embed: "https://www.youtube-nocookie.com/embed/y8WUI2ZmTlw",
      title:
        "வாடி பொட்ட புள்ள வெளிய.. பொம்மை CM SONG..😂 | MK STALIN | VADIVELU | UDHAYANIDHI | DMK SONG",
      author: "DMK TheeyaSakthi Admin",
      date: "November 3, 2025",
      comments: 0,
    },
  ];

  // Reactions state
  const [reactions, setReactions] = useState({});

  // Load saved reactions
  useEffect(() => {
    const saved = localStorage.getItem("video-reactions");
    if (saved) setReactions(JSON.parse(saved));
  }, []);

  // Save changes
  useEffect(() => {
    localStorage.setItem("video-reactions", JSON.stringify(reactions));
  }, [reactions]);

  const handleLike = (id) => {
    setReactions((prev) => ({
      ...prev,
      [id]: prev[id] === "like" ? null : "like",
    }));
  };

  const handleDislike = (id) => {
    setReactions((prev) => ({
      ...prev,
      [id]: prev[id] === "dislike" ? null : "dislike",
    }));
  };

  return (
    <Container>
      
        <h1>Categories Section</h1>
      

      {/* CONTENT BELOW */}
      <div className="video-grid">
        {videos.map((v) => (
          <article key={v.id} className="video-card">
            <div className="video-wrapper">
              <iframe
                src={v.embed}
                title={v.title}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>

            <h2 className="video-title">{v.title}</h2>

            <div className="video-actions">
              <button
                className={`action-btn ${
                  reactions[v.id] === "like" ? "active like" : ""
                }`}
                onClick={() => handleLike(v.id)}
              >
                👍 Like
              </button>

              <button
                className={`action-btn ${
                  reactions[v.id] === "dislike" ? "active dislike" : ""
                }`}
                onClick={() => handleDislike(v.id)}
              >
                👎 Dislike
              </button>

              <button
                className="action-btn"
                onClick={() => {
                  const url = window.location.href;
                  if (navigator.share)
                    navigator.share({ title: v.title, url });
                  else {
                    navigator.clipboard.writeText(url);
                    alert("Link copied 👍");
                  }
                }}
              >
                🔗 Share
              </button>
            </div>

            <div className="video-meta">
              <span>By {v.author}</span>
              <span> — </span>
              <span>{v.date}</span>
              
            </div>
          </article>
        ))}
      </div>
    </Container>
  );
}
