import Notification from "../models/notification.model.js";

export const getNotifications = async (req, res) => {
  try {
    const userId = req.user._id;

    const notifications = await Notification.find({ to: userId }).
    populate({ path: "user", select: "username profileImg"});
    if(!notifications) {
      return res.status(404).json({ error: "No notifications found" });
    }

    await Notification.updateMany({ to: userId }, { read: true })

    res.status(200).json(notifications);
  } catch (error) {
    console.error(`Error in getNotifications controller ${error.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
}

export const deleteNotifications = async (req, res) => {
  try {
    const userId = req.user._id;

    await Notification.deleteMany({ to: userId });

    res.status(200).json({ message: "Notifications has been deleted" });
  } catch (error) {
    console.error(`Error in getNotifications controller ${error.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
}