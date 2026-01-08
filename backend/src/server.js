import express from "express";
import path from "path";
import { clerkMiddleware } from '@clerk/express';
import { ENV } from "../src/config/env.js";
import { connectDB } from "./config/db.js";

const app = express();
const _dirname = path.resolve()

app.use(clerkMiddleware())

app.get("/api/health", (req, res) =>{
    res.status(200).json({message:"success"});
});

//make our app ready for development
if(ENV.NODE_ENV === "production"){
    app.use(express.static(path.join(_dirname, "../admin/dist")))

    app.get("/{*any}", (req, res) =>{
        res.sendFile(path.json(_dirname, "../admin","dist","index.html"));
    });
}

app.listen(ENV.PORT, ()=>{
    console.log("Server is running Successfully!")
    connectDB();
});