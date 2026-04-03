import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { getProfile, updateProfile, changePassword } from "../controllers/userController.js";

const router = express.Router();

router.get("/profile", authMiddleware, getProfile);
router.put("/update-profile", authMiddleware, updateProfile);
router.post("/change-password", authMiddleware, changePassword);

export default router;