import mongoose from "mongoose";

const techStackSchema = new mongoose.Schema(
  {
    category: { type: String, required: true },
    skills: [
      {
        name: { type: String, required: true },
        level: { type: String, enum: ["Beginner", "Intermediate", "Advanced"], default: "Intermediate" },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("TechStack", techStackSchema);
