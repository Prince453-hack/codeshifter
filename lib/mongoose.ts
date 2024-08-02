import mongoose from "mongoose";

let isConnected: boolean = false;

export const connectToDatabase = async () => {
  mongoose.set("strictQuery", true);

  if (!process.env.MONGODB_URL) {
    return console.log("Database is not configured");
  }

  if (isConnected) {
    return;
  }
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      dbName: "codeshift",
    });
    isConnected: true;
  } catch (error) {
    console.error("Error connecting to Mongodb");
  }
};
