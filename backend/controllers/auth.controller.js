import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import { generateAccessToken } from "../libs/utils/generateAccessToken.js";

export const signup = async (req, res) => {
  try {
    const { email, password, fullName, username } = req.body;

    if(!email || !password || !fullName || !username) {
      return res.status(400).json({ error: "Please fill in all fields" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    const existingEmail = await User.findOne({ email });
    if(existingEmail) {
      return res.status(400).json({ error: "Email already exist" });
    }

    const existingUsername = await User.findOne({ username });
    if(existingUsername) {
      return res.status(400).json({ error: "Username already exist" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      email,
      password: hashedPassword,
      fullName,
      username,
    });

    generateAccessToken(newUser._id, res);

    await newUser.save();

    res.status(201).json({ ...newUser._doc, password: undefined });
  } catch (error) {
    console.error(`Error in signup controller ${error.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
}

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if(!username || !password) {
      return res.status(400).json({ error: "Please fill in all fields" });
    }

    const user = await User.findOne({ username });
    if(!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if(!isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    generateAccessToken(user._id, res);

    res.status(200).json({ ...user._doc, password: undefined });
  } catch (error) {
    console.error(`Error in login controller ${error.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
}

export const logout = async (req, res) => {
  try {
    res.cookie("access_token", "", { maxAge: 0 });
    res.status(200).json({ message: "Logout successfully" });
  } catch (error) {
    console.error(`Error in logout controller ${error.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
}

export const me = async (req, res) => {
  try {
    const user = await User.findOne({_id: req.user._id}).select("-password");

    res.status(200).json(user);
  } catch (error) {
    console.error(`Error in me controller ${error.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
}