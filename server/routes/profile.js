import express from "express";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Profile
 *   description: User profile routes
 */

/**
 * @swagger
 * /api/profile:
 *   get:
 *     summary: Get logged-in user's profile
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Returns user profile
 *       401:
 *         description: Unauthorized, no token or invalid token
 */

router.get("/", requireAuth, (req, res) => {
  res.json(req.user);
});

/**
 * @swagger
 * /api/profile:
 *   put:
 *     summary: Update logged-in user's profile
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             description: Fields to update (any user fields)
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *       500:
 *         description: Server error
 */

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

/**
 * @swagger
 * /api/profile/skill:
 *   post:
 *     summary: Add a skill to logged-in user's profile
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               skill:
 *                 type: string
 *     responses:
 *       200:
 *         description: Skill added successfully
 *       400:
 *         description: Skill is required
 *       500:
 *         description: Server error
 */

router.post("/skill", requireAuth, async (req, res) => {
  const { skill } = req.body;
  if (!skill) return res.status(400).json({ msg: "Skill is required" });
  req.user.skills.push(skill);
  await req.user.save();
  res.json(req.user.skills);
});

/**
 * @swagger
 * /api/profile/project:
 *   post:
 *     summary: Add a project to logged-in user's profile
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - desc
 *             properties:
 *               name:
 *                 type: string
 *               desc:
 *                 type: string
 *               link:
 *                 type: string
 *     responses:
 *       200:
 *         description: Project added successfully
 *       400:
 *         description: Name & desc required
 *       500:
 *         description: Server error
 */

router.post("/project", requireAuth, async (req, res) => {
  const { name, desc, link } = req.body;
  if (!name || !desc)
    return res.status(400).json({ msg: "Name & desc required" });
  req.user.projects.push({ name, desc, link });
  await req.user.save();
  res.json(req.user.projects);
});

export default router;
