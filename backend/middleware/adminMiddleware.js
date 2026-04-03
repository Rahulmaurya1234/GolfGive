import jwt from "jsonwebtoken";

const adminMiddleware = (req, res, next) => {
  try {
    if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({
      message: "Access denied (Admin only)"
    });
  }

    next();

  } catch (error) {
    return res.status(500).json({
      message: "Server error"
    });
  }
};

export default adminMiddleware;