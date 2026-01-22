import PageTransition from "../PageTransition";
import { useEffect, useRef } from "react";

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

  const play = (ref) => ref.current && ref.current.play();
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
                Watch as outrage turns into election funding—because the joke’s always on you.
              </r>
            </p>
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
            font-size: 30px;
            text-align: center;
            margin-bottom: 10px;
          }

          .about-text p {
            font-size: 22px;
            line-height: 1.7;
          }
        `}</style>
      </section>
    </PageTransition>
  );
}
