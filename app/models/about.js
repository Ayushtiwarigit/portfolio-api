import mongoose from "mongoose";

const aboutSchema = new mongoose.Schema(
  {
    image: { type: String },
    aboutText: { type: String, required: true },
    techStack: [{ type: String }],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export default mongoose.model("About", aboutSchema);
