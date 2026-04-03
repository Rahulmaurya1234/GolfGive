import User from "../models/User.js";
import Draw from "../models/Draw.js";
import Subscription from "../models/Subscription.js";

// ==========================
// 📊 ADMIN STATS
// ==========================
export const getAdminStats = async (req, res) => {
try {
const totalUsers = await User.countDocuments();
const totalDraws = await Draw.countDocuments();


const draws = await Draw.find();

let totalPrizePool = 0;
draws.forEach(draw => {
  totalPrizePool += Number(draw.totalPool) || 0;
});

const subs = await Subscription.find();

let totalCharity = 0;
subs.forEach(sub => {
  const amount = Number(sub.amount) || 0;
  const percentage = Number(sub.charityPercentage) || 0;
  totalCharity += (amount * percentage) / 100;
});

res.json({
  totalUsers,
  totalDraws,
  totalPrizePool,
  totalCharity
});


} catch (error) {
res.status(500).json({ message: error.message });
}
};

// ==========================
// ✅ VERIFY WINNER
// ==========================
export const verifyWinner = async (req, res) => {
try {
const { drawId, userId, status } = req.body;


if (!["approved", "rejected"].includes(status)) {
  return res.status(400).json({ message: "Invalid status" });
}

const draw = await Draw.findById(drawId);

if (!draw) {
  return res.status(404).json({ message: "Draw not found" });
}

const result = draw.results.find(
  r => r.user.toString() === userId
);

if (!result) {
  return res.status(404).json({ message: "Result not found" });
}

if (result.result.prize <= 0) {
  return res.status(400).json({
    message: "This user is not a winner"
  });
}

if (result.result.status === "approved") {
  return res.status(400).json({
    message: "Already approved"
  });
}

result.result.status = status;
result.result.paymentStatus = "pending";

await draw.save();

res.json({
  message: `Winner ${status} successfully`,
  result
});


} catch (error) {
res.status(500).json({ message: error.message });
}
};

// ==========================
// 🏆 GET WINNERS (FINAL FIX)
// ==========================
export const getWinners = async (req, res) => {
try {
const draws = await Draw.find()
.populate("results.user", "name email");


const winners = [];

draws.forEach(draw => {
  draw.results.forEach(r => {
    if (r.result?.prize > 0) {
      winners.push({
        drawId: draw._id,
        user: r.user || null,
        userId: r.user?._id || null,   // ✅ needed for verify
        matchCount: r.match || 0,      // ✅ frontend uses this
        prize: r.result.prize || 0,
        status: r.result.status || "pending"
      });
    }
  });
});

// ✅ IMPORTANT: frontend expects { winners }
res.json({ winners });


} catch (error) {
res.status(500).json({ message: error.message });
}
};
