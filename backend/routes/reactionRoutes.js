import express from "express";
import {
  getReaction,
  setReaction,
} from "../controllers/reactionController.js";

const router = express.Router();

// public (can be protected later)
router.get("/:type/:itemId", getReaction);
router.post("/:type/:itemId", setReaction);

export default router;
