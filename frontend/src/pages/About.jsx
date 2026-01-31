import PageTransition from "../PageTransition";
import { useEffect, useRef } from "react";
import { FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";

import video1 from "../assets/video1.mp4";
import video2 from "../assets/video2.mp4";
import video3 from "../assets/video3.mp4";

export default function About() {
  const v1 = useRef(null);
  const v2 = useRef(null);
  const v3 = useRef(null);

  useEffect(() => {
    const elements = document.querySelectorAll(".reveal, .reveal-left");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          }
        });
      },
      { threshold: 0.2 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const play = (ref) => {
    if (ref.current) {
      const playPromise = ref.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Auto-play was prevented or interrupted
        });
      }
    }
  };

  const pause = (ref) => {
    if (ref.current) {
      ref.current.pause();
      ref.current.currentTime = 0;
    }
  };

  return (
    <PageTransition>
      <section className="hero">
        <h1>ABOUT US</h1>

        {/* === Section 1 === */}
        <div
          className="about-block reveal hover-grow"
          onMouseEnter={() => play(v1)}
          onMouseLeave={() => pause(v1)}
        >
          <div className="about-text">
            <h2 className="about-subtitle">Political Parody</h2>
            <p>
              <r>
                You can enjoy a variety of everyday troll content about the DMK party here,
                along with a satirical explanation of the party's drawbacks and why we don't need it.
              </r>
            </p>
            <Link to="/about/political-parody" className="see-more-link">
              <span>See More</span>
              <FaChevronRight />
            </Link>
          </div>

          <div className="about-photo">
            <div className="photo-frame">
              <video
                ref={v1}
                src={video1}
                muted
                playsInline
                preload="metadata"
              />
            </div>
          </div>
        </div>

        {/* === Section 2 === */}
        <div
          className="about-block reverse reveal-left hover-grow"
          onMouseEnter={() => play(v2)}
          onMouseLeave={() => pause(v2)}
        >
          <div className="about-text">
            <h2 className="about-subtitle">Campaign Carnival</h2>
            <p>
              <r>
                Welcome to the circus of democracy, where career politicians juggle your tax dollars
                while promising the moon every four years—only to deliver the same tired script.
              </r>
            </p>
            <Link to="/about/campaign-carnival" className="see-more-link">
              <span>See More</span>
              <FaChevronRight />
            </Link>
          </div>

          <div className="about-photo">
            <div className="photo-frame">
              <video
                ref={v2}
                src={video2}
                muted
                playsInline
                preload="metadata"
              />
            </div>
          </div>
        </div>

        {/* === Section 3 === */}
        <div
          className="about-block reveal hover-grow"
          onMouseEnter={() => play(v3)}
          onMouseLeave={() => pause(v3)}
        >
          <div className="about-text">
            <h2 className="about-subtitle">Outrage Economy</h2>
            <p>
              <r>
                Who needs competence when you've got charisma and a Super PAC?
                Watch as outrage turns into election funding—because the joke's always on you.
              </r>
            </p>
            <Link to="/about/outrage-economy" className="see-more-link">
              <span>See More</span>
              <FaChevronRight />
            </Link>
          </div>

          <div className="about-photo">
            <div className="photo-frame">
              <video
                ref={v3}
                src={video3}
                muted
                playsInline
                preload="metadata"
              />
            </div>
          </div>
        </div>

        {/* 🎨 Styles */}
        <style>{`
          .hero h1 {
            font-size: 2rem;
            font-weight: 700;
            text-align: center;
            margin-bottom: 20px;
          }

          .hero {
            padding: 20px 40px; /* Further reduced padding */
          }

          .photo-frame video {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: inherit;
          }

          .hover-grow .about-text {
            transition: transform 0.35s ease;
          }

          .hover-grow:hover .about-text {
            transform: scale(1.06);
          }

          .about-text h2 {
            font-size: 28px;
            text-align: center;
            margin-bottom: 5px;
          }

          .about-text p {
            font-size: 20px;
            line-height: 1.7;
            margin: 0 0 10px 0;
          }

          .about-text {
            text-align: center;
          }

          .see-more-link {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            margin: 8px auto 0;
            padding: 8px 16px;
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.3);
            border-radius: 25px;
            color: #fff;
            text-decoration: none;
            font-weight: 600;
            font-size: 14px;
            transition: all 0.3s ease;
            backdrop-filter: blur(5px);
            cursor: pointer;
          }

          .see-more-link:hover {
            background: rgba(255, 255, 255, 0.2);
            border-color: rgba(255, 255, 255, 0.5);
            transform: translateX(5px);
            color: #fff;
          }

          .see-more-link svg {
            transition: transform 0.3s ease;
          }

          .see-more-link:hover svg {
            transform: translateX(4px);
          }

          @media (max-width: 768px) {
            .hero h1 {
              font-size: 1.5rem;
              margin-bottom: 0;
              
            }
              .about-text h2{
              font-size: 28px;
        }
              .about-text p{
              font-size: 15px;
              }

            .see-more-link {
              font-size: 14px;
              padding: 8px 16px;
            }
          }
        `}</style>
      </section>
    </PageTransition>
  );
}
