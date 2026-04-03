import Subscription from "../models/Subscription.js";

// helper
const getPlanAmount = (plan) => {
  if (plan === "monthly") return 1000;
  if (plan === "yearly") return 10000;
  return 0;
};

// CREATE SUBSCRIPTION
export const createSubscription = async (req, res) => {
  try {
    const { plan, charityPercentage, charityId } = req.body;

    if (!plan) {
      return res.status(400).json({ message: "Plan required" });
    }

    if (!["monthly", "yearly"].includes(plan)) {
      return res.status(400).json({ message: "Invalid plan" });
    }

    if (!charityId) {
      return res.status(400).json({
        message: "Charity selection required"
      });
    }

    if (
      charityPercentage &&
      (charityPercentage < 10 || charityPercentage > 100)
    ) {
      return res.status(400).json({
        message: "Charity must be between 10-100%"
      });
    }

    const existing = await Subscription.findOne({
      user: req.user.id
    }).sort({ createdAt: -1 });

    // ✅ safe expiry check
    if (existing && existing.endDate && existing.endDate < new Date()) {
      existing.status = "expired";
      await existing.save();
    }

    if (existing && existing.status === "active") {
      return res.status(400).json({
        message: "Already subscribed"
      });
    }

    const startDate = new Date();
    const endDate = new Date();

    if (plan === "monthly") {
      endDate.setMonth(endDate.getMonth() + 1);
    } else {
      endDate.setFullYear(endDate.getFullYear() + 1);
    }

    const amount = getPlanAmount(plan);

    const subscription = await Subscription.create({
      user: req.user.id,
      plan,
      startDate,
      endDate,
      status: "active",
      charityPercentage: charityPercentage || 10,
      charityId,
      amount
    });

    res.status(201).json({
      message: "Subscription successful",
      subscription
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// GET SUBSCRIPTION
export const getSubscription = async (req, res) => {
  try {
    const subscription = await Subscription.findOne({
      user: req.user.id
    })
      .sort({ createdAt: -1 })
      .populate("charityId", "name");

    if (!subscription) {
      return res.json({
        message: "No subscription found"
      });
    }

    res.json(subscription);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// CANCEL SUBSCRIPTION
export const cancelSubscription = async (req, res) => {
  try {
    const subscription = await Subscription.findOneAndUpdate(
      {
        user: req.user.id,
        status: "active"
      },
      {
        status: "cancelled"
      },
      {
        new: true
      }
    );

    if (!subscription) {
      return res.status(404).json({
        message: "No active subscription found"
      });
    }

    res.json({
      message: "Subscription cancelled successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


export const updateSubscription = async (req, res) => {
  try {
    const { plan, charityId, charityPercentage } = req.body;

    const subscription = await Subscription.findOne({
      user: req.user.id,
      status: "active"
    });

    if (!subscription) {
      return res.status(404).json({
        message: "No active subscription found"
      });
    }

    // update fields
    if (plan) subscription.plan = plan;
    if (charityId) subscription.charityId = charityId;
    if (charityPercentage)
      subscription.charityPercentage = charityPercentage;

    await subscription.save();

    res.json({
      message: "Subscription updated successfully",
      subscription
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};