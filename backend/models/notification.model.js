import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
  },
  action: {
    type: String,
    enum: ["Liked", "Followed", "Commented"],
  },
}, { timestamps: true });

const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;