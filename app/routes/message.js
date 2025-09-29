import express from "express";
import {
  sendMessage,
  getMessages,
  replyMessage,
} from "../controllers/message.js";

const router = express.Router();

// User
router.post("/", sendMessage);

// Admin
router.get("/", getMessages);
router.post("/reply/:id", replyMessage);

export default router;
