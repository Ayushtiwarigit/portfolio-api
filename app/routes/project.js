import express from "express";
import auth from "../middlewares/auth.js";
import { uploadImage } from "../middlewares/fileUploader.js";
import { addProject, getProjects, getProjectById, updateProject, deleteProject, } from "../controllers/project.js";

const router = express.Router();

router.get("/", getProjects);
router.get("/:id", getProjectById);

router.post("/", auth, uploadImage.single("projectImage"), addProject);
router.patch("/:id", auth, uploadImage.single("projectImage"), updateProject);
router.delete("/:id", auth, deleteProject);

export default router;
