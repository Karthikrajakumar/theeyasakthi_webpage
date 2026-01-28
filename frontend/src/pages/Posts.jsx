import React, { useEffect, useState } from "react";
import PageTransition from "../PageTransition";
import { Container } from "react-bootstrap";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../firebase/firebase";
import "./Posts.css";


export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const q = query(
          collection(db, "posts"),
          orderBy("createdAt", "desc")
        );

        const snapshot = await getDocs(q);

        const postsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setPosts(postsData);
      } catch (err) {
        console.error("Failed to fetch posts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <PageTransition>
      <Container style={{ marginTop: 30 }}>
        <h1 style={{ marginBottom: 40 }}>Posts Page</h1>

        {loading && <p>Loading posts...</p>}

        {!loading && posts.length === 0 && (
          <p>No posts available.</p>
        )}

        <div className="insta-grid">
          {posts.map((post) => (
            <div key={post.id} className="insta-item">
              <div className="flip-card">

                {/* FRONT – IMAGE */}
                <div className="flip-face flip-front">
                  {post.imageUrl ? (
                    <img
                      src={post.imageUrl}
                      alt="Post"
                      loading="lazy"
                    />
                  ) : (
                    <div className="no-image">No Image</div>
                  )}
                </div>

                {/* BACK – CONTENT */}
                <div className="flip-face flip-back">
                  {post.title && <h4>{post.title}</h4>}

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
      </Container>
    </PageTransition>
  );
}
