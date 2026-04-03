import Subscription from "../models/Subscription.js";
const checkSubscription = async (req, res, next) => {
  try {
    const sub = await Subscription.findOne({
      user: req.user.id,
      status: "active"
    }).sort({ createdAt: -1 });

    if (!sub) {
      return res.status(403).json({
        message: "Subscription required"
      });
    }

    // expiry check
    if (sub.endDate && sub.endDate < new Date()) {
      sub.status = "expired";
      await sub.save();

      return res.status(403).json({
        message: "Subscription expired"
      });
    }

    next();

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default checkSubscription;