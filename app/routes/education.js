import express from "express";
import { createEducation, getEducations, updateEducation, deleteEducation } from "../controllers/education.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

router.post("/", auth, createEducation);

router.get("/", getEducations);

router.patch("/:id", auth, updateEducation);

router.delete("/:id", auth, deleteEducation);

export default router;
