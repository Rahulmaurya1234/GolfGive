import Charity from "../models/Charity.js";
import Subscription from "../models/Subscription.js";

// CREATE CHARITY (Admin)
export const createCharity = async (req, res) => {
  try {
    const { name, description, image } = req.body;

    // 🔹 Validation
    if (!name) {
      return res.status(400).json({
        message: "Charity name is required"
      });
    }

    // 🔹 Case-insensitive duplicate check
    const exists = await Charity.findOne({
      name: { $regex: `^${name}$`, $options: "i" }
    });

    if (exists) {
      return res.status(400).json({
        message: "Charity already exists"
      });
    }

    const charity = await Charity.create({
      name,
      description,
      image
    });

    res.status(201).json({
      message: "Charity created successfully",
      charity
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// UPDATE CHARITY (Admin)
export const updateCharity = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, image } = req.body;

    // 🔹 Validation
    if (!name) {
      return res.status(400).json({
        message: "Name is required"
      });
    }

    const charity = await Charity.findByIdAndUpdate(
      id,
      { name, description, image },
      { new: true }
    );

    if (!charity) {
      return res.status(404).json({
        message: "Charity not found"
      });
    }

    res.json({
      message: "Charity updated successfully",
      charity
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// DELETE CHARITY (Admin)
export const deleteCharity = async (req, res) => {
  try {
    const { id } = req.params;

    // 🔥 Check if used in subscriptions (IMPORTANT FIX)
    const usedInSubs = await Subscription.findOne({
      charityId: id
    });

    if (usedInSubs) {
      return res.status(400).json({
        message: "Cannot delete charity. It is used in subscriptions."
      });
    }

    const charity = await Charity.findByIdAndDelete(id);

    if (!charity) {
      return res.status(404).json({
        message: "Charity not found"
      });
    }

    res.json({
      message: "Charity deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// GET ALL CHARITIES (Public)
export const getCharities = async (req, res) => {
  try {
    const charities = await Charity.find()
      .sort({ createdAt: -1 });

    res.json({
      count: charities.length,
      data: charities
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};