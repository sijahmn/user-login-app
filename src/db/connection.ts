import mongoose from "mongoose";
import dotenv from 'dotenv';

//env confirigation
dotenv.config()

//mongodb connection
export const mongoConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI as string)
        console.log("database connected");
    } catch (error) {
        console.log("database not connected");
    }
}
