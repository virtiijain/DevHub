import express from "express";
import Post from "../models/Post.js";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

router.post("/", requireAuth, async (req, res) => {
  try {
    const { text, project, type, tags, image } = req.body;

    const post = await Post.create({
      text,
      project,
      type,
      tags: Array.isArray(tags) ? tags : [],
      image,
      user: req.user._id,
    });

    const populated = await Post.findById(post._id).populate(
      "user",
      "username"
    );

    req.app.get("io").emit("newPost", populated);

    res.json(populated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const posts = await Post.find({})
      .populate("user", "username")
      .populate("comments.user", "username")
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/:id/like", requireAuth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const userId = req.user._id.toString();
    if (post.likes.includes(userId))
      post.likes = post.likes.filter((id) => id.toString() !== userId);
    else post.likes.push(userId);

    await post.save();

    const populated = await Post.findById(post._id)
      .populate("user", "username")
      .populate("comments.user", "username");

    req.app
      .get("io")
      .emit("updateLike", { postId: post._id, likes: post.likes });

    res.json(populated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/:id/comment", requireAuth, async (req, res) => {
  try {
    const { text } = req.body;
    if (!text?.trim())
      return res.status(400).json({ message: "Comment cannot be empty" });

    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const newComment = { user: req.user._id, text };
    post.comments.push(newComment);

    await post.save();

    const populatedPost = await Post.findById(post._id)
      .populate("user", "username")
      .populate("comments.user", "username");

    const latestComment =
      populatedPost.comments[populatedPost.comments.length - 1];
    req.app
      .get("io")
      .emit("newComment", { postId: post._id, comment: latestComment });

    res.json(latestComment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
