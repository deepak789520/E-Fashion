import express from "express";
import { productmodule } from "../model/product_schema.js";
export const productRouter = express.Router()




productRouter.get('/getproducts',
async(req,res)=>{
  try {
        const userentry = await productmodule.find({})
        res.send(userentry)
   
  } catch (error) {
    console.log(error);
  }
})

