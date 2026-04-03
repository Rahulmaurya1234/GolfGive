import Score from "../models/Score.js";
import Subscription from "../models/Subscription.js";
import Draw from "../models/Draw.js";
import User from "../models/User.js";

export const getDashboard = async (req, res) => {
  try {
    const userId = req.user.id;

    // 🔹 Parallel queries (fast 🚀)
    const [scores, subscription, user, draws] = await Promise.all([
      Score.find({ user: userId })
        .sort({ createdAt: -1 })
        .limit(5),

      Subscription.findOne({
        user: userId,
        status: "active"
      }).populate("charityId", "name"),

      User.findById(userId).select("name email"),

      Draw.find({ "results.user": userId })
    ]);

    // 🔹 Stats
    let totalWins = 0;
    let totalAmount = 0;
    let totalParticipated = draws.length;

    let winnings = [];

    draws.forEach(draw => {
      const result = draw.results.find(
        r => r.user.toString() === userId
      );

      if (result) {
        const prize = result.result?.prize || 0;

        winnings.push({
          drawId: draw._id,
          match: result.match,
          type: result.result?.type || "No Prize",
          prize,
          status: result.result?.status || "pending",
          date: draw.drawDate
        });

        if (prize > 0) {
          totalWins++;
          totalAmount += prize;
        }
      }
    });

    // 🔹 Latest winnings first
    winnings.sort((a, b) => new Date(b.date) - new Date(a.date));

    // 🔹 Response
    res.json({
      user: {
        name: user?.name,
        email: user?.email
      },

      subscription: {
        status: subscription ? "active" : "inactive",
        renewalDate: subscription?.endDate || null
      },

      charity: {
        id: subscription?.charityId?._id || null,
        name: subscription?.charityId?.name || null,
        percentage: subscription?.charityPercentage || 10
      },

      scores: {
        total: scores.length,
        recent: scores
      },

      participation: {
        totalDraws: totalParticipated,
        totalWins,
        totalAmount
      },

      winnings
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};