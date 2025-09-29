import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    reply: { type: String },
    repliedAt: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.model("Message", messageSchema);