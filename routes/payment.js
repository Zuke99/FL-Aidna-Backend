const express = require("express");
const paymentController = require("../controllers/paymentController");

const router = express.Router();

// Create Order
router.post("/orders", paymentController.createOrder);

// Verify Payment
router.post("/verify", paymentController.verifyPayment);

module.exports = router;
