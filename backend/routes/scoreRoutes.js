// routes/score.routes.js
import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import checkSubscription from "../middleware/subscriptionMiddleware.js";
import { addScore, getScores } from "../controllers/scoreController.js";
import {checkCharity} from "../middleware/checkCharity.js";

const router = express.Router();

//  Add score
router.post(
  "/",
  authMiddleware,
  checkSubscription,
  checkCharity,
  addScore
);

// Get scores
router.get(
  "/",
  authMiddleware,
  checkSubscription,
  getScores
);

export default router;