import mongoose from "mongoose";

const mongoURI =
  "mongodb+srv://cafescript:cafescript@cluster0.hkwpdie.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

export const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("MongoDB connected");
  } catch (error) {
    console.log(error);
  }
};
