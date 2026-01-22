import express from "express";
import {
  getSongs,
  getSongById,
  createSong,
  updateSong,
  deleteSong,
} from "../controllers/songController.js";
import { verifyAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// 🌐 public
router.get("/", getSongs);
router.get("/:id", getSongById);

// 🔐 admin
router.post("/", verifyAdmin, createSong);
router.put("/:id", verifyAdmin, updateSong);
router.delete("/:id", verifyAdmin, deleteSong);

export default router;
