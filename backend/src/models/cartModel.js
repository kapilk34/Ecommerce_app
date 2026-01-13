import mongoose from "mongoose";
import { Product } from "./productModel";

const cartIdemSchema = new mongoose.Schema({
    Product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product",
        required:true
    },
    quantity:{
        type:String,
        required:true,
        min:1,
        default:1
    }
});

const cartSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    clerkId:{
        type:String,
        required:true,
        unique:true
    },
    items:{cartIdemSchema}
},{timestamps:true});

export const cart = mongoose.model("Cart", cartSchema);

