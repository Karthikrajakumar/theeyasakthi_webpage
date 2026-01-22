import Song from "../models/Song.js";

/**
 * GET /api/songs
 */
export const getSongs = async (req, res) => {
  try {
    const songs = await Song.find().sort({ createdAt: -1 });
    res.json(songs);
  } catch {
    res.status(500).json({ message: "Failed to fetch songs" });
  }
};

/**
 * GET /api/songs/:id
 */
export const getSongById = async (req, res) => {
  try {
    const song = await Song.findById(req.params.id);
    if (!song) return res.status(404).json(null);
    res.json(song);
  } catch {
    res.status(400).json({ message: "Invalid song ID" });
  }
};

/**
 * POST /api/songs (admin)
 */
export const createSong = async (req, res) => {
  try {
    const { title, host, videoId } = req.body;

    const song = await Song.create({
      title,
      host,     // ✅ explicitly saved
      videoId,
    });

    res.status(201).json(song);
  } catch {
    res.status(400).json({ message: "Failed to create song" });
  }
};

/**
 * PUT /api/songs/:id (admin)
 */
export const updateSong = async (req, res) => {
  try {
    const { title, host, videoId } = req.body;

    const song = await Song.findByIdAndUpdate(
      req.params.id,
      { title, host, videoId },
      { new: true }
    );

    if (!song) return res.status(404).json({ message: "Song not found" });
    res.json(song);
  } catch {
    res.status(400).json({ message: "Failed to update song" });
  }
};

/**
 * DELETE /api/songs/:id (admin)
 */
export const deleteSong = async (req, res) => {
  try {
    const song = await Song.findByIdAndDelete(req.params.id);
    if (!song) return res.status(404).json({ message: "Song not found" });
    res.json({ message: "Song deleted" });
  } catch {
    res.status(400).json({ message: "Failed to delete song" });
  }
};
