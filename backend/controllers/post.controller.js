import Post from "../models/post.model.js";
import cloudinary from "../config/cloudinary.js";
import Notification from "../models/notification.model.js";
import User from "../models/user.model.js";

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate({ path: "user", select: "username profileImg" });
    
    res.status(200).json(posts);
  } catch (error) {
    console.error(`Error in getPost controller ${error.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
}

export const createPost = async (req, res) => {
  try {
    const user = req.user;
    const { caption } = req.body;
    let { file } = req.body;

    // TODO: add file to condition
    if(!caption) {
      return res.status(400).json({ error: "Please fill in all fields" });
    }

    // TODO: uncomment this
    // const uploadOuput = await cloudinary.uploader.upload(file);
    // file = uploadOuput.secure_url;

    const newPost = new Post({
      user: user._id,
      caption,
    });

    await newPost.save();
    res.status(200).json({ message: "Post created successfully" });
  } catch (error) {
    console.error(`Error in createPost controller ${error.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
}

export const likePost = async (req, res) => {
  try {
    const user = req.user;
    const postId = req.params.id;

    const post = await Post.findOne({ _id: postId });
    if(!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    const likedPost = await Post.findOne({ _id: postId, likes: {
      $in: [user._id]
    } })

    if(likedPost) {
      await Post.findByIdAndUpdate({ _id: postId }, {
        $pull: { likes: user._id }
      });
    }

    if(!likedPost) {
      await Post.findByIdAndUpdate({ _id: postId }, {
        $push: { likes: user._id }
      });

      await Notification.create({
        from: user._id,
        to: post.user._id,
        action: "Liked",
      });
    }

    res.status(200).json({ message: "Liked post successfully" });
  } catch (error) {
    console.error(`Error in likePost controller ${error.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
}

export const commentPost = async (req, res) => {
  try {
    const { text } = req.body;
    const user = req.user;
    const postId = req.params.id

    if(!text) {
      return res.status(400).json({ error: "You must input text" });
    }

    let post = await Post.findOne({ _id: postId });
    if(!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    const comment = { text, user: post.user._id};

    post.comments.push(comment);

    await Notification.create({
      from: user._id,
      to: post.user._id,
      action: "Commented",
    })

    await post.save();

    res.status(200).json({ message: "You commented to a post" });
  } catch (error) {
    console.error(`Error in commentPost controller ${error.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
}

export const getUserPosts = async (req, res) => {
  try {
    const username = req.params.username;

    const user = await User.findOne({ username });
    if(!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const posts = await Post.find({ user: user._id }).populate({ 
      path: "user", select: "username profileImg"
    });

    if(!posts) {
      return res.status(404).json({ error: "No post available" });
    } 

    res.status(200).json(posts);
  } catch (error) {
    console.error(`Error in getUserPosts controller ${error.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
}