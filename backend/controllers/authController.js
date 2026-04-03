import bcrypt from "bcrypt";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import { sendEmail } from "../utils/sendEmail.js";  
// SIGNUP
export const signup = async (req, res) => {
  try {
    const { name, email, password, mobile_no } = req.body;

    if (!name || !email || !password || !mobile_no) {
      return res.status(400).json({ message: "All fields required" });
    }

    const existingUser = await User.findOne({
      $or: [{ email }, { mobile_no }]
    });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    await sendEmail(
        email,
        "Verify your account",
        `Your OTP is ${otp}`
        );
        
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      mobile_no,
      otp,
      otpExpiry: Date.now() + 5 * 60 * 1000,
      isVerified: false,
    });

    await newUser.save();

    console.log("Signup OTP 👉", otp);

    res.json({ message: "OTP sent successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// VERIFY OTP
export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ message: "User not found" });

    if (user.isVerified) {
      return res.json({ message: "Already verified" });
    }

    if (user.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (user.otpExpiry < Date.now()) {
      return res.status(400).json({ message: "OTP expired" });
    }

    user.isVerified = true;
    user.otp = null;
    user.otpExpiry = null;

    await user.save();

    res.json({ message: "User verified successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// LOGIN
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ message: "User not found" });

    if (!user.isVerified) {
      return res.status(400).json({
        message: "Please verify your account first"
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login successful",
      token
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// RESEND OTP
export const resendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ message: "User not found" });

    if (user.isVerified) {
      return res.status(400).json({ message: "User already verified" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    user.otp = otp;
    user.otpExpiry = Date.now() + 5 * 60 * 1000;

    await user.save();

    console.log("Resend OTP 👉", otp);

    res.json({ message: "OTP resent successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// FORGOT PASSWORD
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ message: "User not found" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    user.otp = otp;
    user.otpExpiry = Date.now() + 5 * 60 * 1000;

    await user.save();

    console.log("Reset OTP 👉", otp);

    res.json({ message: "OTP sent for password reset" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// RESET PASSWORD
export const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ message: "User not found" });

    if (user.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (user.otpExpiry < Date.now()) {
      return res.status(400).json({ message: "OTP expired" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    user.otp = null;
    user.otpExpiry = null;

    await user.save();

    res.json({ message: "Password reset successful" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};