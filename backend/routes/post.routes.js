import express from "express";
import { accessRoute } from "../middleware/accessRoute.js";
import { commentPost, createPost, getPosts, getUserPosts, likePost } from "../controllers/post.controller.js";

const router = express.Router();

router.get("/", accessRoute, getPosts);
router.post("/create", accessRoute, createPost);
router.post("/like/:id", accessRoute, likePost);
router.post("/comment/:id", accessRoute, commentPost);
router.get("/:username", accessRoute, getUserPosts);

export default router;