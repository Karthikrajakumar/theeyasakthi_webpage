import React, { useEffect, useState } from "react";
import PageTransition from "../PageTransition";
import { Container } from "react-bootstrap";

export default function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error("Failed to fetch posts", err));
  }, []);

  return (
    <PageTransition>
      <Container style={{ marginTop: 30 }}>
        <h1 style={{ marginBottom: 40 }}>Posts Page</h1>

        <div className="insta-grid">
          {posts.map((post) => (
            <div key={post._id} className="insta-item">
              <div className="flip-card">

                {/* FRONT – IMAGE */}
                <div className="flip-face flip-front">
                  {post.imageUrl && (
                    <img
                      src={`http://localhost:5000${post.imageUrl}`}
                      alt="Post"
                    />
                  )}
                </div>

                {/* BACK – CONTENT */}
                <div className="flip-face flip-back">
                  {post.content && <p>{post.content}</p>}

                  {post.link && (
                    <a
                      href={post.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View more
                    </a>
                  )}
                </div>

              </div>
            </div>
          ))}
        </div>

        <style>
          {`
/* GRID */
.insta-grid{
  display: grid;
  grid-template-columns: repeat(3, minmax(360px, 1fr));
  gap: 40px;
}

/* OUTER CARD */
.insta-item{
  perspective: 1400px;
}

/* FLIP CONTAINER */
.flip-card{
  width: 100%;
  aspect-ratio: 3 / 4;
  position: relative;
  transform-style: preserve-3d;
  border-radius: 18px;
  overflow: hidden;

  background: #000;
  box-shadow: 0 10px 28px rgba(0,0,0,0.18);

  /* 🧈 SLOW, PREMIUM FLIP */
  transition: transform 1.1s cubic-bezier(0.22, 1, 0.36, 1);
}

/* FLIP ON HOVER */
.insta-item:hover .flip-card{
  transform: rotateY(180deg);
}

/* BOTH SIDES */
.flip-face{
  position: absolute;
  inset: 0;
  backface-visibility: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* FRONT IMAGE */
.flip-front{
  background: #000;
}

.flip-front img{
  width: 100%;
  height: 100%;
  object-fit: contain;     /* ✅ NO CROPPING */
  background: #000;
}

/* BACK CONTENT */
.flip-back{
  transform: rotateY(180deg);
  padding: 24px;
  text-align: center;
  color: #fff;

  background: linear-gradient(
    to bottom,
    rgba(0,0,0,0.95),
    rgba(0,0,0,0.85)
  );
}

.flip-back p{
  font-size: 15px;
  line-height: 1.7;
  margin-bottom: 16px;
}

.flip-back a{
  font-size: 14px;
  color: #38bdf8;
  text-decoration: none;
}

.flip-back a:hover{
  text-decoration: underline;
}

/* MOBILE – disable flip, show content */
@media (hover: none){
  .flip-card{
    transform: none !important;
  }

  .flip-back{
    position: static;
    transform: none;
    background: #f5f5f5;
    color: #222;
  }

  .flip-front{
    position: static;
  }
}

/* RESPONSIVE */
@media(max-width: 992px){
  .insta-grid{
    grid-template-columns: repeat(2, 1fr);
    gap: 28px;
  }
}

@media(max-width: 600px){
  .insta-grid{
    grid-template-columns: 1fr;
    gap: 24px;
  }
}
          `}
        </style>
      </Container>
    </PageTransition>
  );
}
