import mongoose from 'mongoose';
const { Schema } = mongoose;
//creating schema structure for mogobd database 
const Schemastr = new Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:new Date()
    }
  
});

export const usermodule  = mongoose.model("users", Schemastr)