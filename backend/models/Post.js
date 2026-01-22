import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: { type: String, default: "" },
    content: { type: String, default: "" },
    link: { type: String, default: "" },
    imageUrl: { type: String, default: "" },
    originalImageName: {
  type: String,
  default: "",
},

  },
  { timestamps: true }
);

export default mongoose.model("Post", postSchema);
