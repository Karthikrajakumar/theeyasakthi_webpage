import mongoose from "mongoose";

const songSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    host: { type: String },        // ✅ ADD THIS
    videoId: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Song", songSchema);
