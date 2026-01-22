import Post from "../models/Post.js";
import fs from "fs";
import path from "path";

export const getPosts = async (req, res) => {
  const posts = await Post.find().sort({ createdAt: -1 });
  res.json(posts);
};

export const createPost = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "Image is required" });
  }

  const post = await Post.create({
    title: req.body.title || "",
    content: req.body.content || "",
    link: req.body.link || "",
    imageUrl: `/uploads/posts/${req.file.filename}`,
    originalImageName: req.file.originalname, // ✅ STORE ORIGINAL NAME
  });

  res.status(201).json(post);
};





export const updatePost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  const title = req.body.title ?? post.title;
  const content = req.body.content ?? post.content;
  const link = req.body.link ?? post.link;

  let imageUrl = post.imageUrl;

  if (req.file) {
  if (post.imageUrl) {
    const oldPath = path.join(process.cwd(), post.imageUrl);
    if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
  }

  updated.imageUrl = `/uploads/posts/${req.file.filename}`;
  updated.originalImageName = req.file.originalname; // ✅ UPDATE NAME
}

  // 🚫 Image must exist (old or new)
  if (!imageUrl) {
    return res.status(400).json({
      message: "Image is required",
    });
  }

  const updatedPost = await Post.findByIdAndUpdate(
    req.params.id,
    { title, content, link, imageUrl },
    { new: true }
  );

  res.json(updatedPost);
};






export const deletePost = async (req, res) => {
  await Post.findByIdAndDelete(req.params.id);
  res.json({ message: "Post deleted" });
};
