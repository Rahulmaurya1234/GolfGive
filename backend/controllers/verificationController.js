import Draw from "../models/Draw.js";

export const verifyWinner = async (req, res) => {
  try {
    const { drawId, userId, status } = req.body;

    // 🔹 validate status
    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({
        message: "Invalid status"
      });
    }

    const draw = await Draw.findById(drawId);

    if (!draw) {
      return res.status(404).json({
        message: "Draw not found"
      });
    }

    const result = draw.results.find(
      r => r.user.toString() === userId
    );

    if (!result) {
      return res.status(404).json({
        message: "Result not found"
      });
    }

    // 🔥 only winners allowed
    if (result.result.prize <= 0) {
      return res.status(400).json({
        message: "This user is not a winner"
      });
    }

    // 🔥 prevent re-verification
    if (result.result.status === "approved") {
      return res.status(400).json({
        message: "Already approved"
      });
    }

    // 🔹 update status
    result.result.status = status;

    // 🔥 payment logic
    if (status === "approved") {
      result.result.paymentStatus = "pending";
    } else {
      result.result.paymentStatus = "pending"; // optional
    }

    await draw.save();

    res.json({
      message: `Winner ${status} successfully`,
      result
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};