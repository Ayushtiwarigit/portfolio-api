import express from "express";
import { createContact, getContact, updateContact, deleteContact, } from "../controllers/contact.js";

const router = express.Router();

router.post("/", createContact);
router.patch("/:id", updateContact);
router.delete("/:id", deleteContact);
router.get("/", getContact);

export default router;
