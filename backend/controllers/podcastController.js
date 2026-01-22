import Podcast from "../models/Podcast.js";

/**
 * GET /api/podcasts
 */
export const getPodcasts = async (req, res) => {
  try {
    const podcasts = await Podcast.find().sort({ createdAt: -1 });
    res.json(podcasts);
  } catch {
    res.status(500).json({ message: "Failed to fetch podcasts" });
  }
};

/**
 * GET /api/podcasts/:id
 */
export const getPodcastById = async (req, res) => {
  try {
    const podcast = await Podcast.findById(req.params.id);
    if (!podcast) return res.status(404).json(null);
    res.json(podcast);
  } catch {
    res.status(400).json({ message: "Invalid podcast ID" });
  }
};

/**
 * POST /api/podcasts (admin)
 */
export const createPodcast = async (req, res) => {
  try {
    const { title, host, videoId } = req.body;

    const podcast = await Podcast.create({
      title,
      host,     // ✅ explicitly saved
      videoId,
    });

    res.status(201).json(podcast);
  } catch {
    res.status(400).json({ message: "Failed to create podcast" });
  }
};

/**
 * PUT /api/podcasts/:id (admin)
 */
export const updatePodcast = async (req, res) => {
  try {
    const { title, host, videoId } = req.body;

    const podcast = await Podcast.findByIdAndUpdate(
      req.params.id,
      { title, host, videoId },
      { new: true }
    );

    if (!podcast)
      return res.status(404).json({ message: "Podcast not found" });

    res.json(podcast);
  } catch {
    res.status(400).json({ message: "Failed to update podcast" });
  }
};

/**
 * DELETE /api/podcasts/:id (admin)
 */
export const deletePodcast = async (req, res) => {
  try {
    const podcast = await Podcast.findByIdAndDelete(req.params.id);
    if (!podcast)
      return res.status(404).json({ message: "Podcast not found" });
    res.json({ message: "Podcast deleted" });
  } catch {
    res.status(400).json({ message: "Failed to delete podcast" });
  }
};
