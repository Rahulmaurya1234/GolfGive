import express from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import subscriptionRoutes from "./routes/subscriptionRoutes.js";
import charityRoutes from "./routes/charityRoutes.js";
import scoreRoutes from "./routes/scoreRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";

const app = express();

// 🔹 middleware
app.use(cors());
app.use(express.json());

// 🔹 routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/subscription", subscriptionRoutes);
app.use("/api/charity", charityRoutes);
app.use("/api/scores", scoreRoutes);
app.use("/api/dashboard", dashboardRoutes);

// 🔹 test route
app.get("/", (req, res) => {
  res.send("Server working 🚀");
});

export default app;