import express from "express";
import { usermodule } from "../model/schema.js";
import { body, validationResult } from "express-validator";
import bcrypt from "bcrypt";
import jwt  from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();


export const loginRouter = express.Router()
//Router:2 =>used for login to check user is registered or not
loginRouter.post('/login',
body('email',"enter valid email id ").isEmail(),
body('password',"password cannot be empty").isLength({min:5}),
async(req,res)=>{
  
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });// check for erros in userinput
    }
try {
    const userdoc= await usermodule.findOne(
        {email:req.body.email}
    )
    if(!userdoc){
        return res.status(400).send({ status: 'error', message: 'Invalid email or password' });
    }
    const validPassword = await bcrypt.compare(req.body.password, userdoc.password);
    if (!validPassword) {
      return res.status(400).send({ status: 'error', message: 'Invalid email or password' });}
    console.log(userdoc)
    console.log(req.body.password)
    if (userdoc){
        console.log("Login success")
        
    }
    else{ 
        console.log("Incorrect password")
        res.status(400).json("Incorrect Credentials!!")
    }
   
    let data = {
     id: userdoc._id
            
        }
        let token = jwt.sign(data, process.env.JWT_STRING , { expiresIn: '5h' })
        res.json(token)
        
} catch (error) {
    console.log(error)
}
}
)