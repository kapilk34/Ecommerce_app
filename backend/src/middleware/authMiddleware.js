import { requireAuth } from "@clerk/express";
import { User } from "../models/userModel";
import { ENV } from "../config/env";

export const protectRoute = [
    requireAuth(),
    async (req,res,next) =>{
        try {
            const clerkId = req.auth().userId
            if(!clerkId)
                return res.status(401).json({message:"Unauthorized User"})

            const user = await User.findOne({clerkId})
            if(!User)
                return res.status(404).json({message:"User not found!"})

            req.user = user

            next();
        } catch (error) {
            console.error("Enter in protectedRoute middleware", error)
            res.status(500).json({message:"Internal server Error!"})
        }
    }
];

export const adminOnly = (req,res,next) =>{
    if(!req.user){
        return res.status(401).json({message:"Unauthorised User"})
    }
    
    if(req.user.email !== ENV.ADMIN_EMAIL){
        return res.status(403).json({message:"Forbidder - admin access only"})
    }

    next();
}