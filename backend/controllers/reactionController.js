import Reaction from "../models/Reaction.js";

/**
 * GET reaction for an item
 * /api/reactions/:type/:itemId
 */
export const getReaction = async (req, res) => {
  const { type, itemId } = req.params;

  try {
    const reaction = await Reaction.findOne({ type, itemId });
    res.json(reaction || { reaction: null });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch reaction" });
  }
};

/**
 * SET / UPDATE reaction
 * /api/reactions/:type/:itemId
 */
export const setReaction = async (req, res) => {
  const { type, itemId } = req.params;
  const { reaction } = req.body;

  try {
    const updated = await Reaction.findOneAndUpdate(
      { type, itemId },
      { reaction },
      { upsert: true, new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Failed to update reaction" });
  }
};
