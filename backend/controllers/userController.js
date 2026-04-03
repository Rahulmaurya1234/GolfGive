import User from "../models/User.js";
import bcrypt from "bcryptjs";

// ✅ Update Profile
export const updateProfile = async (req, res) => {
  try {
    const { name } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { name },
      { new: true }
    ).select("-password");

    res.json({
      message: "Profile updated",
      user
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Change Password
export const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    const user = await User.findById(req.user.id);

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Wrong password" });
    }

    user.password = newPassword;
    await user.save();

    res.json({ message: "Password updated" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .select("-password -otp -otpExpiry");

    res.json({
      message: "Profile data",
      user
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};