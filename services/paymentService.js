const Razorpay = require("razorpay");
const crypto = require("crypto");

const razorpayInstance = new Razorpay({
  key_id: process.env.KEY_ID,
  key_secret: process.env.KEY_SECRET,
});

const createOrder = async (amount) => {
  const options = {
    amount: Number(amount * 100),
    currency: "INR",
    receipt: crypto.randomBytes(10).toString("hex"),
  };

  return new Promise((resolve, reject) => {
    razorpayInstance.orders.create(options, (error, order) => {
      if (error) {
        reject(error);
      } else {
        resolve(order);
      }
    });
  });
};

const verifyPayment = (razorpay_order_id, razorpay_payment_id, razorpay_signature) => {
  const sign = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSign = crypto
    .createHmac("sha256", process.env.KEY_SECRET)
    .update(sign.toString())
    .digest("hex");

  return expectedSign === razorpay_signature;
};

module.exports = {
  createOrder, verifyPayment
}