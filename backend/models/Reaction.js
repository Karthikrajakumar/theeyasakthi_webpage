import mongoose from "mongoose";

const reactionSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["song", "video", "podcast"],
      required: true,
    },
    itemId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      index: true,
    },
    reaction: {
      type: String,
      enum: ["like", "dislike"],
      default: null,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Reaction", reactionSchema);
