import mongoose from "mongoose";

const drawSchema = new mongoose.Schema({
  numbers: {
    type: [Number],
    required: true
  },

  drawDate: {
    type: Date,
    default: Date.now
  },

  totalPool: Number,
  fiveMatchPool: Number,
  fourMatchPool: Number,
  threeMatchPool: Number,

  jackpot: {
    type: Number,
    default: 0
  },

  results: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      },

      match: Number,

      result: {
        type: {
          type: String
        },
        prize: {
          type: Number,
          default: 0
        },
        status: {
          type: String,
          enum: ["pending", "approved", "rejected"],
          default: "pending"
        },

        // 🔥 NEW FIELDS
        proof: {
          type: String
        },

        paymentStatus: {
          type: String,
          enum: ["pending", "paid"],
          default: "pending"
        }
      }
    }
  ]

}, { timestamps: true });

export default mongoose.model("Draw", drawSchema);