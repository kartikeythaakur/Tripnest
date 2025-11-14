import mongoose from 'mongoose';

const BookingSchema = new mongoose.Schema({

  user:{type: mongoose.Schema.Types.ObjectId,ref: 'User',required: true},
  propertyId:{type: mongoose.Schema.Types.ObjectId , ref:"Propertyschema",required:true},
  roomType : {type: mongoose.Schema.Types.ObjectId, ref: 'RoomSchema',required: true},
  checkIn : {type:Date , required:true},
  checkOut : {type:Date , required:true},
  amountPaid :{type:Number, required:true},
  status: {type:String , enum:["pending","confirmed",'cancelled'], default: "pending", required:true},
  paymentInfo: {orderId:String , paymentId:String},
  createdAt:{type:Date,default:Date.now},

},{timestamps:true});

export default mongoose.model('Booking', BookingSchema);