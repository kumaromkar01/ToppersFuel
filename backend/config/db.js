import mongoose from "mongoose";

export async function connectToDB() {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected: ", conn.connection.host);
  } catch (error) {
    console.log(process.env.MONGO_URI);
    console.log("Error connecting to mongoDB: ", error.message);
    process.exit(1);
  }
}
