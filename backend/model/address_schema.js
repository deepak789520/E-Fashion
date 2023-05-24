import mongoose from 'mongoose';
const { Schema } = mongoose;
const SchemaAdd = new Schema({
    userId:{
        type:Schema.Types.ObjectId,
        required:true
    },
    house:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true
    },
    code:{
        type:Number,
        required:true
    },
    date:{
        type:Date,
        default:new Date()
    }
  
});

export const addressmodule  = mongoose.model("addresses", SchemaAdd)