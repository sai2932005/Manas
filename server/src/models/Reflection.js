import mongoose from "mongoose";

const reflectionSchema = new mongoose.Schema(
  {
    // User who owns this reflection
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Parent session
    session: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Session",
      required: true,
    },

    // User's original thought
    thought: {
      type: String,
      required: true,
      trim: true,
    },

    // AI Analysis
    distortion: {
      type: String,
      default: "",
    },

    barrier: {
      type: String,
      default: "",
    },

    technique: {
      type: String,
      default: "",
    },

    experiment: {
      type: String,
      default: "",
    },

    balancedThought: {
      type: String,
      default: "",
    },

    // User reflection after completing experiment
    reflection: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ["pending", "completed"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const Reflection = mongoose.model("Reflection", reflectionSchema);

export default Reflection;