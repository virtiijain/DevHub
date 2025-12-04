import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    user: { type: String, required: true },
    text: { type: String, required: true },
  },
  { timestamps: true }
);

const questionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    tags: [String],
    user: { type: String, required: true },
    votes: { type: Number, default: 0 },
    comments: [commentSchema],
  },
  { timestamps: true }
);

export default mongoose.models.Question ||
  mongoose.model("Question", questionSchema);
