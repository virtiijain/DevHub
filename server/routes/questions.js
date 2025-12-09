import express from "express";
import Question from "../models/Question.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Questions
 *   description: Question management routes
 */

/**
 * @swagger
 * /api/questions:
 *   get:
 *     summary: Get all questions
 *     tags: [Questions]
 *     responses:
 *       200:
 *         description: Returns a list of questions
 *       500:
 *         description: Server error
 */

router.get("/", async (req, res) => {
  try {
    const questions = await Question.find().sort({ createdAt: -1 });
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /api/questions:
 *   post:
 *     summary: Create a new question
 *     tags: [Questions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - user
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *               user:
 *                 type: string
 *     responses:
 *       201:
 *         description: Question created successfully
 *       500:
 *         description: Server error
 */

router.post("/", async (req, res) => {
  const { title, description, tags, user } = req.body;
  try {
    const newQuestion = new Question({ title, description, tags, user });
    await newQuestion.save();

    const io = req.app.get("io");
    io.emit("newQuestion", newQuestion);

    res.status(201).json(newQuestion);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /api/questions/{id}/comments:
 *   post:
 *     summary: Add a comment to a question
 *     tags: [Questions]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Question ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user
 *               - text
 *             properties:
 *               user:
 *                 type: string
 *               text:
 *                 type: string
 *     responses:
 *       200:
 *         description: Comment added successfully
 *       404:
 *         description: Question not found
 *       500:
 *         description: Server error
 */

router.post("/:id/comments", async (req, res) => {
  const { id } = req.params;
  const { user, text } = req.body;

  try {
    const question = await Question.findById(id);
    if (!question) return res.status(404).json({ error: "Question not found" });

    question.comments.push({ user, text });
    await question.save();

    const io = req.app.get("io");
    io.emit("newComment", question);

    res.json(question);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


/**
 * @swagger
 * /api/questions/{id}/vote:
 *   post:
 *     summary: Upvote or downvote a question
 *     tags: [Questions]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Question ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - type
 *             properties:
 *               type:
 *                 type: string
 *                 enum: [up, down]
 *     responses:
 *       200:
 *         description: Vote updated successfully
 *       404:
 *         description: Question not found
 *       500:
 *         description: Server error
 */

router.post("/:id/vote", async (req, res) => {
  const { id } = req.params;
  const { type } = req.body;

  try {
    const question = await Question.findById(id);
    if (!question) return res.status(404).json({ error: "Question not found" });

    if (type === "up") question.votes += 1;
    if (type === "down") question.votes -= 1;

    await question.save();

    const io = req.app.get("io");
    io.emit("voteUpdate", question);

    res.json(question);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
