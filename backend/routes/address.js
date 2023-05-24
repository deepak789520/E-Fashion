import express from "express";
import { verifyToken } from "./authmiddleware.js";
import { addressmodule } from "../model/address_schema.js";
import { usermodule } from "../model/schema.js";

export const addressrouter = express.Router()

//accepting address details from router
addressrouter.post("/address", verifyToken, async (req, res) => {
  try {
    const user = await usermodule.findOne({ _id: req.id });
    
    if (!user) {
      return res.status(400).send({ errors: "Authentication failed" });
    }

    const address = await addressmodule.create({
      userId: req.id,
      house: req.body.house,
      city: req.body.city,
      state: req.body.state,
      country: req.body.country,
      code: req.body.code,
    });

    if (!address) {
      return res.status(400).send({ errors: "Failed to create address" });
    }

    res.status(200).send(address);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ errors: "Internal server error" });
  }
});



addressrouter.get("/getaddress", verifyToken,
async(req,res)=>{
    const user= await usermodule.find({_id:req.id})
    
    const recieve = await addressmodule.find({userId:req.id})
    if (!recieve){
        return res.status(400).send(error,'user details not entered')
    }
    res.send(recieve)
    
})


addressrouter.delete("/deleteaddress/:addressId",  async (req, res) => {
    try {
      const addressId = req.params.addressId;
      // Check if the address exists
      const address = await addressmodule.findOne({ _id: addressId });
      if (!address) {
        return res.status(404).json({ status: 'error', message: 'Address not found' });
      }
      // Delete the address
      await addressmodule.deleteOne({ _id: addressId });
  
      res.status(200).json({ status: 'success', message: 'Address deleted successfully' });
    }catch (error) {
      console.log(error);
      return res.status(500).send({ errors: "Internal server error" });
    }
  });
  

  addressrouter.put("/updateaddress/:addressId",  async (req, res) => {
    try {
    
      const addressId = req.params.addressId;
      const { house, city, state, country, code } = req.body;
  
      // Check if the address exists
      const address = await addressmodule.findOne({ _id: addressId });
      if (!address) {
        return res.status(404).json({ status: 'error', message: 'Address not found' });
      }
  
      // Update the address
      await addressmodule.updateOne(
        { _id: addressId },
        { $set: { house, city, state, country, code } }
      );
  
      res.status(200).json({ status: 'success', message: 'Address updated successfully' });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ errors: "Internal server error" });
    }
  });
  