import express from 'express';
import { upsertAbout , getAbout } from '../controllers/about.js';
import { uploadImage } from '../middlewares/fileUploader.js';
import auth from '../middlewares/auth.js';

const router = express.Router();

// router.post("/", auth, uploadImage, upsertAbout);

router.post("/",auth, uploadImage.single("image"), upsertAbout);

router.get("/", getAbout);

export default router;
