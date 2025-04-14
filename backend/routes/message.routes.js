import express from "express";
import { accessRoute } from "../middleware/accessRoute.js";
import { getMessageHistory, getMessages, sendMessage } from "../controllers/message.controller.js";

const router = express.Router();

router.get("/history", accessRoute, getMessageHistory);
router.get("/:id", accessRoute, getMessages);
router.post("/:id", accessRoute, sendMessage);

export default router;