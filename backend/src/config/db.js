import mongoose from "mongoose";
import { ENV } from "../../src/config/env.js";

export const connectDB = async() =>{
    try {
        const  connect = await mongoose.connect(ENV.MONGO_DB_URL)
         console.log(`Database Connected Successfully to: ${connect.connection.host}`);
    } catch (error) {
        console.error("Error in Connecting database!");
        process.exit(1); //exit code 1 means fail and code 0 means success. 
    }
}