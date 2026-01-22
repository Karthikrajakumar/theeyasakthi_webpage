import express from "express";
import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
} from "../controllers/postController.js";
import { uploadPostImage } from "../middleware/uploadPostImage.js";

const router = express.Router();

router.get("/", getPosts);

// ⬇️ image upload enabled
router.post("/", uploadPostImage.single("image"), createPost);
router.put("/:id", uploadPostImage.single("image"), updatePost);

router.delete("/:id", deletePost);

export default router;
