import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";

import { connectDB } from "./config/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server running at http://localhost:${PORT}`);
});