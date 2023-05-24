import mongoose from 'mongoose';
const { Schema } = mongoose;
//creating schema structure for mogobd database 
const Schemaproduct = new Schema({
    product:{
        type:Number,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    category:{
        type:String,
        required:true
    },
  
});

export const productmodule = mongoose.model("products", Schemaproduct)