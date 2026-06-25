import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
{
  booking:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Booking",
    required:true
  },

  tenant:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
  },

  amount:{
    type:Number,
    required:true
  },

  razorpayOrderId:String,

  razorpayPaymentId:String,

  razorpaySignature:String,

  status:{
    type:String,
    enum:[
      "Created",
      "Paid",
      "Failed"
    ],
    default:"Created"
  }
},
{
  timestamps:true
});

export default mongoose.model(
  "Payment",
  paymentSchema
);