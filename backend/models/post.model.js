import mongoose from "mongoose";

// TODO: make file required

const postSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  file: {
    type: String,
    default: "",
    // required: true,
  },
  caption: {
    type: String,
    required: true,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    }
  ],
  comments: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      text: {
        type: String,
        required: true,
      }
    }
  ]
}, { timestamps: true });

const Post = mongoose.model("Post", postSchema);

export default Post;