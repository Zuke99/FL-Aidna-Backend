const paymentService = require("../services/paymentService");
const orderService = require("../services/orderService")

const createOrder = async (req, res) => {
  const { amount } = req.body;

  try {
    const order = await paymentService.createOrder(amount);
    res.status(200).json({ data: order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
};

const verifyPayment = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, firstName, lastName } =
    req.body;

    const name = `${firstName} ${lastName}`
    const eventData = {...req.body, name}

  try {
    const isAuthentic = paymentService.verifyPayment(
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    );

    if (isAuthentic) {
      // Payment logic like saving to the database can be added here
      res.json({ message: "Payment Successful" });
      await orderService.createOrder(eventData)
    } else {
      res.status(400).json({ message: "Invalid Payment Verification!" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
};

module.exports = {
  createOrder, verifyPayment
}