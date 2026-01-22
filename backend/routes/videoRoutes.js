import express from "express";
import {
  getVideos,
  getVideoById,
  createVideo,
  updateVideo,
  deleteVideo,
} from "../controllers/videoController.js";
import { verifyAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// 🌐 public
router.get("/", getVideos);
router.get("/:id", getVideoById);   // 👈 REQUIRED for VideoWatch

// 🔐 admin
router.post("/", verifyAdmin, createVideo);
router.put("/:id", verifyAdmin, updateVideo);
router.delete("/:id", verifyAdmin, deleteVideo);

export default router;
