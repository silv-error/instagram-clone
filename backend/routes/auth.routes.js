import express from "express";
import { logout, login, me, signup } from "../controllers/auth.controller.js";
import { accessRoute } from "../middleware/accessRoute.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/me", accessRoute, me);

export default router;