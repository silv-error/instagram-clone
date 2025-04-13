import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  website: {
    type: String,
    default: "",
  },
  bio: {
    type: String,
    default: "",
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Prefer not to say", ""],
    default: "",
  },
  following: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    }
  ],
  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    }
  ],
  profileImg: {
    type: String,
    default: "",
  },
  notes: {
    type: String,
    default: "",
  }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;