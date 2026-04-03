// routes/dashboard.routes.js

import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import checkSubscription from "../middleware/subscriptionMiddleware.js";
import { getDashboard } from "../controllers/dashboardController.js";

const router = express.Router();

// 📊 Dashboard route
router.get(
  "/",
  authMiddleware,
  checkSubscription,
  getDashboard
);

export default router;