import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

// 🔹 Controllers
import { runDraw, simulateDraw } from "../controllers/drawController.js";
import { verifyWinner, getWinners, getAdminStats } from "../controllers/adminController.js";
import {
  createCharity,
  updateCharity,
  deleteCharity,
  getCharities
} from "../controllers/charityController.js";

import Draw from "../models/Draw.js";
import User from "../models/User.js";

const router = express.Router();


// ==========================
// 👑 ADMIN DASHBOARD
// ==========================
router.get(
  "/dashboard",
  authMiddleware,
  adminMiddleware,
  (req, res) => {
    res.json({
      message: "Welcome Admin 👑",
      admin: req.user
    });
  }
);

router.get(
  "/stats",
  authMiddleware,
  adminMiddleware,
  getAdminStats
);

// ==========================
// 🎯 DRAW CONTROL
// ==========================
router.post(
  "/simulate-draw",
  authMiddleware,
  adminMiddleware,
  simulateDraw
);

router.post(
  "/run-draw",
  authMiddleware,
  adminMiddleware,
  runDraw
);


// ==========================
// 🏆 WINNER CONTROL
// ==========================
router.post(
  "/verify-winner",
  authMiddleware,
  adminMiddleware,
  verifyWinner
);

router.get(
  "/winners",
  authMiddleware,
  adminMiddleware,
  getWinners
);


// ==========================
// 👥 USER MANAGEMENT
// ==========================
router.get(
  "/users",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    try {
      const users = await User.find()
        .select("-password")
        .sort({ createdAt: -1 });

      res.json({
        count: users.length,
        data: users
      });

    } catch (error) {
      res.status(500).json({
        message: error.message
      });
    }
  }
);


// ==========================
// 🎲 DRAW HISTORY
// ==========================
router.get(
  "/draws",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    try {
      const draws = await Draw.find()
        .sort({ createdAt: -1 });

      res.json({
        count: draws.length,
        data: draws
      });

    } catch (error) {
      res.status(500).json({
        message: error.message
      });
    }
  }
);


// ==========================
// ❤️ CHARITY MANAGEMENT (ADMIN)
// ==========================

// Create
router.post(
  "/charity",
  authMiddleware,
  adminMiddleware,
  createCharity
);

// Update
router.put(
  "/charity/:id",
  authMiddleware,
  adminMiddleware,
  updateCharity
);

// Delete
router.delete(
  "/charity/:id",
  authMiddleware,
  adminMiddleware,
  deleteCharity
);

// Get all (admin view भी)
router.get(
  "/charities",
  authMiddleware,
  adminMiddleware,
  getCharities
);


export default router;