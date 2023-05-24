import mongoose, { connect } from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const mongourl=process.env.MONGO_DB_URL;
// url to link mongodb
const connectdb = async()=>{
   try{
    const result= await mongoose.connect(mongourl)
    console.log("sucessfully Connected to mongodb")
   }
   catch(error){
    console.log(error)
   }
}

export default connectdb;