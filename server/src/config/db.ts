import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log("MongoDB connected! Server live!");
  } catch (error) {
    console.error(
      "MongoDB connection not working: Check error:",
      process.env.MONGODB_URI,
      error
    );
    process.exit(1);
  }
};

export default connectDB;
