import Video from "../models/Video.js";

/**
 * GET /api/videos
 */
export const getVideos = async (req, res) => {
  try {
    const videos = await Video.find().sort({ createdAt: -1 });
    res.json(videos);
  } catch {
    res.status(500).json({ message: "Failed to fetch videos" });
  }
};

/**
 * GET /api/videos/:id
 */
export const getVideoById = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return res.status(404).json(null);
    res.json(video);
  } catch {
    res.status(400).json({ message: "Invalid video ID" });
  }
};

/**
 * POST /api/videos (admin)
 */
export const createVideo = async (req, res) => {
  try {
    const { title, host, videoId } = req.body;

    const video = await Video.create({
      title,
      host,     // ✅ explicitly saved
      videoId,
    });

    res.status(201).json(video);
  } catch {
    res.status(400).json({ message: "Failed to create video" });
  }
};

/**
 * PUT /api/videos/:id (admin)
 */
export const updateVideo = async (req, res) => {
  try {
    const { title, host, videoId } = req.body;

    const video = await Video.findByIdAndUpdate(
      req.params.id,
      { title, host, videoId },
      { new: true }
    );

    if (!video) return res.status(404).json({ message: "Video not found" });
    res.json(video);
  } catch {
    res.status(400).json({ message: "Failed to update video" });
  }
};

/**
 * DELETE /api/videos/:id (admin)
 */
export const deleteVideo = async (req, res) => {
  try {
    const video = await Video.findByIdAndDelete(req.params.id);
    if (!video) return res.status(404).json({ message: "Video not found" });
    res.json({ message: "Video deleted" });
  } catch {
    res.status(400).json({ message: "Failed to delete video" });
  }
};
