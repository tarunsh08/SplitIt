import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectToDb = async () => {
  try {
    const response = await mongoose.connect(`${process.env.MONGO_URI}`);
    console.log("database connected successfully...");
    console.log("MongoDB connection host : ", response.connection.host);
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err);
    throw err;
  }
};

export default connectToDb;
