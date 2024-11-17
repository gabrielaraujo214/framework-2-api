const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models/User");
const authenticateJWT = require("../middlewares/authMiddleware");

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - password
 *       properties:
 *         username:
 *           type: string
 *         password:
 *           type: string
 *     LoginResponse:
 *       type: object
 *       properties:
 *         token:
 *           type: string
 */

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: "Register a new user"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: "User registered successfully"
 */

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: "Login with username and password"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: "Login successful"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 */

/**
 * @swagger
 * /users/profile:
 *   get:
 *     summary: "Get user profile"
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: "User profile fetched successfully"
 */

router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ username, password: hashedPassword });
  res.status(201).json(user);
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ where: { username } });

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  res.json({ token });
});

router.get("/profile", authenticateJWT, (req, res) => {
  res.json({ message: "This is a protected route", user: req.user });
});

module.exports = router;