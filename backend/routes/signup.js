import express from "express";
import { usermodule } from "../model/schema.js";
import { body, validationResult } from "express-validator";
import bcrypt from "bcrypt";
export const signupRouter = express.Router()



//Router:1 =>used for creation for userentery to database
signupRouter.post('/register',
body('firstname',"enter valid name size of min 5").isLength({min:1}),
body('lastname',"enter valid name size of min 5").isLength({min:1}),
body('email',"enter valid email id ").isEmail(),
body('phone',"enter valid phone number  min 10").isLength({min:10,max:10}),
body('password',"enter valid password size of min 5").isLength({min:5}),
async(req,res)=>{
  try {
    const errors = validationResult(req);// check for erros in userinput
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const emailExist = await usermodule.findOne({ email: req.body.email });
    const phoneExist = await usermodule.findOne({ phone: req.body.phone });
    if (emailExist || phoneExist) {
     return res.status(400).json({ status: 'error', message: 'User already exists. Please login' });}


    const passocde = await bcrypt.hash(req.body.password, 5)
    
        const userentry = await usermodule.create({
            
            firstname:req.body.firstname,
            lastname:req.body.lastname,
            email:req.body.email,
            phone:req.body.phone,
            password:passocde

        })
        res.send("registred sucessfully")
    
  } catch (error) {
    console.log(error);
  }
 
})




