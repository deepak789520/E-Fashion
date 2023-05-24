import express from "express";
import { verifyToken } from "./authmiddleware.js";
import { ordermodule } from "../model/order_schema.js";


export const orderRouter = express.Router()

orderRouter.get("/getorder", verifyToken,
async(req,res)=>{
    console.log(req.id)
    const recieve = await ordermodule.find({userId:req.id})
    console.log(recieve)
    if (!recieve){
        return res.status(400).send(error,'user details not entered')
    }
    res.send(recieve)
    
})

