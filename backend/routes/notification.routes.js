import express from "express";
import { accessRoute } from "../middleware/accessRoute.js";
import { deleteNotifications, getNotifications } from "../controllers/notification.controller.js";

const router = express.Router();

router.get("/", accessRoute, getNotifications);
router.delete("/", accessRoute, deleteNotifications);

export default router;