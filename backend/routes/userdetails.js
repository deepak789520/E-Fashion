import express from "express";
import { usermodule } from "../model/schema.js";
import { verifyToken } from "./authmiddleware.js";
export const userRouter = express.Router()


userRouter.get("/getuser",verifyToken,
async(req,res)=>{
    try {
        const user= await usermodule.findOne(
            {_id:req.id},{_id:1,firstname:1,lastname:1,email:1,phone:1})
        if(!user){
            return res.status(400).send({errors: "authentication wrong"})
        }
        res.status(200).send(user)

    } catch (error) {
        res.status(400).send("some internal server error")
    }
}
)