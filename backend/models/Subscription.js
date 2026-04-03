import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  plan: {
    type: String,
    enum: ["monthly", "yearly"],
    required: true
  },

  status: {
    type: String,
    enum: ["active", "cancelled", "expired"],
    default: "active"
  },

  amount: {
    type: Number,
    required: true
  },

  charityId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Charity",
    required: true
  },

  charityPercentage: {
    type: Number,
    default: 10
  },

  paymentStatus: {
    type: String,
    enum: ["pending", "paid", "failed"],
    default: "paid"
  },

  startDate: {
    type: Date,
    default: Date.now
  },

  endDate: {
    type: Date
  }

}, { timestamps: true });

// prevent multiple active subscriptions
subscriptionSchema.index(
  { user: 1, status: 1 },
  { unique: true, partialFilterExpression: { status: "active" } }
);

export default mongoose.model("Subscription", subscriptionSchema);