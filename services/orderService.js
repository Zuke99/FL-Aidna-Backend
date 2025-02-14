const Order = require('../models/Order')

const createOrder = async (data) => {
  try {
    const newOrder = await Order(data)
    await newOrder.save()
  
    return newOrder
  } catch (error) {
    throw new Error("Error creating order: " + error.message)
  }
}

module.exports = {
  createOrder
}