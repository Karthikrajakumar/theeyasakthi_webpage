import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.js";

import adminAuthRoutes from "./routes/adminAuth.js";
import adminRoutes from "./routes/adminRoutes.js";
import videoRoutes from "./routes/videoRoutes.js";
import songRoutes from "./routes/songRoutes.js";
import podcastRoutes from "./routes/podcastRoutes.js";
import reactionRoutes from "./routes/reactionRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import youtubeRoutes from "./routes/youtubeRoutes.js";

dotenv.config();

// ✅ Connect MongoDB (ONLY ONCE)
connectDB();

const app = express();

// ✅ Middlewares
app.use(cors());
app.use(express.json());

// ✅ Routes
app.use("/api/youtube", youtubeRoutes);
app.use("/api/admin", adminAuthRoutes);
app.use("/api/admin", adminRoutes);

app.use("/api/videos", videoRoutes);
app.use("/api/songs", songRoutes);
app.use("/api/podcasts", podcastRoutes);
app.use("/api/reactions", reactionRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/posts", postRoutes);
app.use("/uploads", express.static("uploads"));



// ✅ Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

app.get("/api/test", (req, res) => {
  res.json({ ok: true });
});

