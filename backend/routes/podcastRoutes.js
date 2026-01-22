import express from "express";
import {
  getPodcasts,
  getPodcastById,
  createPodcast,
  updatePodcast,
  deletePodcast,
} from "../controllers/podcastController.js";
import { verifyAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// 🌐 public
router.get("/", getPodcasts);
router.get("/:id", getPodcastById);   // 👈 REQUIRED for PodcastWatch

// 🔐 admin
router.post("/", verifyAdmin, createPodcast);
router.put("/:id", verifyAdmin, updatePodcast);
router.delete("/:id", verifyAdmin, deletePodcast);

export default router;
