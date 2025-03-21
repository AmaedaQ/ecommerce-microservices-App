const express = require("express");
const Payment = require("../models/Payment");

const router = express.Router();

// ✅ Process Payment (Mock Payment Processing)
router.post("/", async (req, res) => {
  try {
    const { orderId, userId, amount } = req.body;

    // Simulate Payment Processing
    const paymentSuccess = Math.random() < 0.7; // 70% success rate

    const newPayment = new Payment({
      orderId,
      userId,
      amount,
      paymentStatus: paymentSuccess ? "Completed" : "Failed",
    });

    await newPayment.save();
    res.status(201).json({ message: "Payment processed", payment: newPayment });
  } catch (error) {
    res.status(500).json({ message: "Error processing payment", error });
  }
});

// ✅ Check Payment Status
router.get("/:id", async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);

    if (!payment) return res.status(404).json({ message: "Payment not found" });

    res.json({ paymentStatus: payment.paymentStatus });
  } catch (error) {
    res.status(500).json({ message: "Error fetching payment status", error });
  }
});

module.exports = router;
