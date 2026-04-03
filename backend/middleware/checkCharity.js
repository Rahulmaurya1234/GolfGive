import Subscription from "../models/Subscription.js";

export const checkCharity = async (req, res, next) => {
  try {
    const subscription = await Subscription.findOne({
      user: req.user.id,
      status: "active"
    });

    if (!subscription) {
      return res.status(400).json({
        message: "Subscription required"
      });
    }

    if (!subscription.charityId) {
      return res.status(400).json({
        message: "Please select a charity first"
      });
    }

    // 🔥 optional (future use)
    req.subscription = subscription;

    next();

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};