import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URL);
    console.log(`MongoDB connection successfull ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error while connecting MongoDB ${error}`);
    process.exit(1);
  }
};
