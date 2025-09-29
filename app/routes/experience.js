import express from "express";
import {
  addExperience,
  updateExperience,
  deleteExperience,
  getAllExperience,
  getExperienceById,
} from "../controllers/experience.js";
import { uploadImage } from "../middlewares/fileUploader.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

// 🔒 Admin CRUD
router.post("/", auth, uploadImage.single("logo"), addExperience);
router.patch("/:id", auth, uploadImage.single("logo"), updateExperience);
router.delete("/:id", auth, deleteExperience);

// Admin/User fetch
router.get("/", getAllExperience);
router.get("/:id", getExperienceById);

export default router;
