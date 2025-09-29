import express from "express";
import { createTechStack, getAllTechStacks, getTechStackById, updateTechStackById, deleteTechStackById, } from "../controllers/techStack.js";

const router = express.Router();

router.post("/", createTechStack);
router.get("/", getAllTechStacks);
router.get("/:id", getTechStackById);
router.patch("/:id", updateTechStackById);
router.delete("/:id", deleteTechStackById);

export default router;