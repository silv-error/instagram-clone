import express from "express";
import { accessRoute } from "../middleware/accessRoute.js";
import { followUnfollowUser, getSuggestedUsers, getUserProfile, getUsers, updateProfile } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", accessRoute, getUsers);
router.get("/profile/:username", accessRoute, getUserProfile);
router.patch("/update", accessRoute, updateProfile);
router.get("/suggested", accessRoute, getSuggestedUsers);
router.patch("/follow/:id", accessRoute, followUnfollowUser);

export default router;