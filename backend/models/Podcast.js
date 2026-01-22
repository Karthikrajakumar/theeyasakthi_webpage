import mongoose from "mongoose";

const podcastSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    host: { type: String },          // ✅ single naming
    videoId: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Podcast", podcastSchema);
