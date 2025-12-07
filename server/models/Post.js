import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    project: { type: String }, // Add project link
    type: { type: String, default: "update" }, // update / win / challenge
    tags: [{ type: String }], // store tags array
    image: { type: String },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    comments: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        text: { type: String },
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Post", postSchema);
