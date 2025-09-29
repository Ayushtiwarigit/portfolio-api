import express from "express";
import { addAward, getAward, updateAward, deleteAward } from "../controllers/awards.js";
import { uploadImage } from "../middlewares/fileUploader.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

router.post("/", auth, uploadImage.single("image"), addAward);
router.get("/", getAward);
router.patch("/:id", auth, uploadImage.single("image"), updateAward);
router.delete("/:id", auth, deleteAward);

export default router;