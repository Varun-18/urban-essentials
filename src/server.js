import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

import { router } from "./routes/index.js";

const app = express();

dotenv.config();

app.use("/", router);

const connectToDatabase = async (port) => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected...");
    console.log(`Server is running on http://localhost:${port}`);
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
};

app.listen(process.env.PORT || 5000, async () => {
  connectToDatabase(process.env.PORT || 5000);
});
