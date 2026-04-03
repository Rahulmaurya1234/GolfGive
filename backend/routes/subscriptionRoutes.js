import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  createSubscription,
  getSubscription,
  cancelSubscription,
  updateSubscription
} from "../controllers/subscriptionController.js";

const router = express.Router();

router.post("/create", authMiddleware, createSubscription);

router.get("/status", authMiddleware, getSubscription);

router.post("/cancel", authMiddleware, cancelSubscription);

router.put("/update", authMiddleware, updateSubscription);

export default router;