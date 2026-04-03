import express from "express";
import { getCharities } from "../controllers/charityController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";
import { createCharity } from "../controllers/charityController.js";
import { updateCharity } from "../controllers/charityController.js";
import { deleteCharity } from "../controllers/charityController.js";

const router = express.Router();


// create charity (admin)
router.post(
  "/create",
  authMiddleware,   // pehle user nikalega
  adminMiddleware,  // phir role check hoga
  createCharity
);

// update
router.put(
    "/:id", 
    authMiddleware, 
    adminMiddleware, 
    updateCharity
);

// delete
router.delete(
    "/:id", 
    authMiddleware, 
    adminMiddleware, 
    deleteCharity);


// get all charities
router.get(
    "/", 
    getCharities
);

export default router;