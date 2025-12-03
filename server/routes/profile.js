import express from "express";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

router.get("/", requireAuth, (req, res) => {
  res.json(req.user);
});

router.put("/", requireAuth, async (req, res) => {
  try {
    Object.assign(req.user, req.body);
    await req.user.save();
    res.json(req.user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: err.message });
  }
});

router.post("/skill", requireAuth, async (req, res) => {
  const { skill } = req.body;
  if (!skill) return res.status(400).json({ msg: "Skill is required" });
  req.user.skills.push(skill);
  await req.user.save();
  res.json(req.user.skills);
});

router.post("/project", requireAuth, async (req, res) => {
  const { name, desc, link } = req.body;
  if (!name || !desc)
    return res.status(400).json({ msg: "Name & desc required" });
  req.user.projects.push({ name, desc, link });
  await req.user.save();
  res.json(req.user.projects);
});

export default router;
