import mongoose from "mongoose";

const educationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    qualification: { type: String, required: true },
    gradeOrPercentage: { type: String, required: true },
    yearOfCompletion: { type: Number, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export default mongoose.model("Education", educationSchema);
