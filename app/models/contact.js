import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    github: {
      type: String,
    },
    linkedin: {
      type: String,
    },
    youtube: {
      type: String,
    },
    twitter: {
      type: String,
    },
    instagram: {
      type: String,
    },
    facebook: {
      type: String,
    },
    website: {
      type: String,
    },
    snapchat: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Contact", contactSchema);
