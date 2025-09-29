import express from "express";
import { addTestimonial, getTestimonial, updateTestimonial, deleteTestimonial } from "../controllers/testimonial.js";
import { uploadImage } from "../middlewares/fileUploader.js";

const router = express.Router();

router.post("/", uploadImage.single("image"), addTestimonial);
router.get("/", getTestimonial);
router.patch("/:id", uploadImage.single("image"), updateTestimonial);
router.delete("/:id", deleteTestimonial);

export default router;