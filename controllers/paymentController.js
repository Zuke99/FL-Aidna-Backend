const paymentService = require("../services/paymentService");
const orderService = require("../services/orderService");
const sendMail = require("../utils/sendMail");

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
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, firstName, lastName, email, date, price,event } =
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
      await sendMail(
        email,
        'Event Registration Success - Confirmation',
        `
        Dear ${name},
      
        Congratulations! Your registration for the event ${event} has been successfully completed. We are thrilled to have you on board.
      
        Event Details:
        - Event Title: ${event}
        - Event Date: ${date} (You will receive further updates regarding the event)
        - Ticket Price: ${price} (This charge was successfully processed)
      
        **Your Order Information:
        - Order Number: ${razorpay_order_id}
        - Payment Status: Successful
      
        You will receive another email with further details such as the event schedule, location, and any other important information closer to the event date. Please keep an eye on your inbox for updates.
      
        What’s Next:
        - If you have any questions about the event, ticketing, or need any assistance, our support team is available to help. Simply reply to this email or contact us at support@aicorp.com.
        - Check your event registration on our website by logging into your account.
      
        We truly appreciate your participation and can’t wait to see you at ${event}. Thank you for choosing to be part of this amazing experience!
      
        Best regards,  
        media2ai
        `
      )
      
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