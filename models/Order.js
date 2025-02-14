const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema(
  {
   name: {type: String, required: true}, 
   event: {type: String, required: true}, 
   email: {type: String, required: true}, 
   phone: {type: Number, required: true}, 
   designation: {type: String, required: true}, 
   company: {type: String, required: true}, 
   seniority: {type: String, required: true}, 
   price: {type: Number, required: true},
   industry: {type: String, required: true}, 
   industry: {type: String, required: true},
   razorpay_order_id: { type: String, required: true},
   razorpay_payment_id: { type: String, required: true},
   razorpay_signature: { type: String, required: true},
  }
)

const Order = mongoose.model("Order", orderSchema)

module.exports = Order