// controllers/scoreController.js
import Score from "../models/Score.js";
import Subscription from "../models/Subscription.js";

export const addScore = async (req, res) => {
  try {
    const userId = req.user.id;
    const { value } = req.body;

    // 🔹 1. Validate score
    if (!value) {
      return res.status(400).json({
        message: "Score value required"
      });
    }

    if (value < 1 || value > 45) {
      return res.status(400).json({
        message: "Score must be between 1-45"
      });
    }

    // 🔹 2. Check active + valid subscription
    const sub = await Subscription.findOne({
      user: userId
    }).sort({ createdAt: -1 });

    if (!sub || sub.status !== "active") {
      return res.status(403).json({
        message: "Active subscription required"
      });
    }

    // expiry check
    if (sub.endDate && new Date(sub.endDate).getTime() < Date.now()) {
      sub.status = "expired";
      await sub.save();

      return res.status(403).json({
        message: "Subscription expired"
      });
    }

    // 🔹 3. Get existing scores (oldest first)
    const scores = await Score.find({ user: userId })
      .sort({ date: 1 });

    // 🔹 4. Keep only 5 scores
    if (scores.length >= 5) {
      await Score.findByIdAndDelete(scores[0]._id);
    }

    // 🔹 5. Create new score with date
    const newScore = await Score.create({
      user: userId,
      value,
      date: new Date()
    });

    res.status(201).json({
      message: "Score added successfully",
      data: newScore
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


export const getScores = async (req, res) => {
  try {
    const userId = req.user.id;

    const scores = await Score.find({ user: userId })
      .sort({ date: -1 });

    res.json({
      count: scores.length,
      data: scores
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};