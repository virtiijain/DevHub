import express from "express";
import Post from "../models/Post.js";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();


/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: Post management routes
 */

/**
 * @swagger
 * /api/posts:
 *   post:
 *     summary: Create a new post
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *               project:
 *                 type: string
 *               type:
 *                 type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *               image:
 *                 type: string
 *     responses:
 *       200:
 *         description: Post created successfully
 *       500:
 *         description: Server error
 */

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

/**
 * @swagger
 * /api/posts:
 *   get:
 *     summary: Get all posts
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: Returns list of posts
 *       500:
 *         description: Server error
 */

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

/**
 * @swagger
 * /api/posts/{id}/like:
 *   post:
 *     summary: Like or unlike a post
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Post ID
 *     responses:
 *       200:
 *         description: Post liked/unliked successfully
 *       404:
 *         description: Post not found
 *       500:
 *         description: Server error
 */

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

/**
 * @swagger
 * /api/posts/{id}/comment:
 *   post:
 *     summary: Comment on a post
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Post ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *     responses:
 *       200:
 *         description: Comment added successfully
 *       400:
 *         description: Comment cannot be empty
 *       404:
 *         description: Post not found
 *       500:
 *         description: Server error
 */

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
