import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverId, io } from "../socket/socketio.js";

export const getMessages = async (req, res) => {
  try {
    const receiverId = req.params.id
    const senderId = req.user._id;

    await Message.updateMany({ senderId, receiverId }, {
      $set: {
        read: true,
      }
    }, { new: true });

    const conversation = await Conversation.findOne({ participants: {
      $all: [senderId, receiverId]
    }}).populate("messages");

    if(!conversation) return res.status(200).json([]);

    res.status(200).json(conversation.messages);
  } catch (error) {
    console.error(`Error in getMessages controller ${error.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
}

export const sendMessage = async (req, res) => {
  try {
    const senderId = req.user._id;
    const receiverId = req.params.id;
    const { message } = req.body;

    if(!message) return res.status(400).json({ error: "No message provided" });

    // TODO: apply crypto-js for message encryption
    let conversation = await Conversation.findOne({ participants: {
      $all: [senderId, receiverId]
    }});

    if(!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId]
      });
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    if(newMessage) conversation.messages.push(newMessage._id);

    const socketReceiverId = getReceiverId(receiverId);
    if(socketReceiverId) io.to(socketReceiverId).emit("newMessage", newMessage);

    Promise.all([
      await conversation.save(),
      await newMessage.save()
    ]);

    res.status(200).json(newMessage);
  } catch (error) {
    console.error(`Error in sendMessage controller ${error.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
}

export const getMessageHistory = async (req, res) => {
  try {
    const senderId = req.user._id;

    const conversations = await Conversation.find({ participants: {
      $in: [senderId]
    }}).populate({ path: "participants", select: "fullName profileImg"});

    const chatHistory = conversations.map((conversation) => {
      return conversation.participants.find((user) => user._id.toString() !== senderId.toString());
    });

    res.status(200).json(chatHistory);
  } catch (error) {
    console.error(`Error in getMessageHistory controller ${error.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
}