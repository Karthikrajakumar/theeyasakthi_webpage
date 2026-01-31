import { Link } from "react-router-dom";
import VideoCarousel from "../components/VideoCarousel";

import hero from "../assets/hero.jpg";
import bgPic from "../assets/bg_pic.jpg";

import PageTransition from "../PageTransition";

export default function Home() {
  return (
    <PageTransition>
      

      {/* 🔥 FULL PAGE BACKGROUND */}
      <div
        className="home-bg"
        style={{ backgroundImage: `url(${bgPic})` }}
      >

        {/* ⭐ HERO IMAGE — stays SAME as before */}
        <section className="hero-image">
          <img src={hero} alt="Welcome to Theeyasakthi TN" />
        </section>

        {/* TEXT OVERLAY BELOW HERO */}
        <section className="intro-hero">
          <h1>Here you can enjoy politics in a sarcastic way.</h1>
          <p>Welcome to TheeyasakthiTN</p>
        </section>

        {/* ABOUT */}
        <section className="about-preview">
          <h2 className="about-subtitle">About Theeyasakthi</h2>

          <p >
             <r>
              Discover the satire, stories, and spicy political takes behind our content.
              Learn why we do what we do — with humour, honesty, and a bold voice. </r>
            
          </p>

          <Link to="/about" className="about-btn">
            Read More
          </Link>
        </section>

        {/* VIDEOS */}
        <VideoCarousel />

      </div>
    </PageTransition>
  );
}
