import express from "express";
import Question from "../models/Question.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const questions = await Question.find().sort({ createdAt: -1 });
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

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
