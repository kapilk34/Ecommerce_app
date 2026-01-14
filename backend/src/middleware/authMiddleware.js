import { requireAuth } from "@clerk/express";
import { User } from "../models/userModel";
import { ENV } from "../config/env";

export const protectRoute = [
    requireAuth(),
    async (req,res,next) =>{
        try {
            const clerkId = req.
        } catch (error) {
            
        }
    }
]