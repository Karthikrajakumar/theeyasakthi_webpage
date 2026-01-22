import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";

import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTop from "./ScrollToTop";

import GlobalLoader from "./components/GlobalLoader";
import RouteChangeLoader from "./components/RouteChangeLoader";
import TopProgressBar from "./components/TopProgressBar";


import SongWatch from "./pages/SongWatch";
import VideoWatch from "./pages/VideoWatch";
import PodcastWatch from "./pages/PodcastWatch";
import YouTubeWatch from "./pages/YouTubeWatch";


const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Blog = lazy(() => import("./pages/Blog"));
const Posts = lazy(() => import("./pages/Posts"));
const Categories = lazy(() => import("./pages/Categories"));
const Songs = lazy(() => import("./pages/Songs"));
const Videos = lazy(() => import("./pages/Videos"));
const Podcasts = lazy(() => import("./pages/Podcasts"));
const PolicyAnalysis = lazy(() => import("./pages/PolicyAnalysis"));
const PublicReactions = lazy(() => import("./pages/PublicReactions"));

export default function App() {
  return (
    <>
      <TopProgressBar />
      <RouteChangeLoader />

      <Header />
      <ScrollToTop />

      <Suspense fallback={<GlobalLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/posts" element={<Posts />} />

          <Route path="/categories" element={<Categories />} />
          
          <Route path="/songs" element={<Songs />} />
          <Route path="/songs/:id" element={<SongWatch />} />


          <Route path="/videos" element={<Videos />} />
          <Route path="/videos/:id" element={<VideoWatch />} />

          <Route path="/podcasts" element={<Podcasts />} />
          <Route path="/podcasts/:id" element={<PodcastWatch/>} />

          <Route path="/youtube/:id" element={<YouTubeWatch />} />

          
          <Route path="/policy-analysis" element={<PolicyAnalysis />} />
          <Route path="/public-reactions" element={<PublicReactions />} />
        </Routes>
      </Suspense>

      <Footer brand="TruthLens" />
    </>
  );
}
