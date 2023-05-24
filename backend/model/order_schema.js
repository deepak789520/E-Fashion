import mongoose from 'mongoose';
const { Schema } = mongoose;
const Schemaorder = new Schema({
    userId:{
        type:String,
        required:true
    },
    customerId:{
        type:String,
    },
    paymentIntentId:{
        type:String,
    },
 products:[{
        id:{type:String},
        name:{type:String},
        price:{type:String},
        quantity:{type:String},
    },
],
subtotal:{type:Number,required:true},
total:{type:Number,required:true},
shippingaddress:{type:Object,required:true},
delivery_status:{type:String,default:"pending"},
payment_status:{type:String,required:true}
},
{timestamps:true}
);

export const ordermodule  = mongoose.model("order", Schemaorder)