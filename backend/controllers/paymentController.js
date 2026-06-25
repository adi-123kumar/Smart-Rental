import crypto from "crypto";

import Booking from "../models/Booking.js";
import Payment from "../models/Payment.js";
import Property from "../models/Property.js";

import razorpay from "../config/razorpay.js";

// CREATE ORDER

export const createOrder = async (
  req,
  res
) => {
  try {

    const booking =
      await Booking.findById(
        req.params.bookingId
      );

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    const totalAmount =
      booking.monthlyRent +
      booking.securityDeposit;

    const options = {
      amount:
        totalAmount * 100,
      currency: "INR",
      receipt:
        booking._id.toString(),
    };

    const order =
      await razorpay.orders.create(
        options
      );

    const payment =
      await Payment.create({
        booking:
          booking._id,
        tenant:
          booking.tenant,
        amount:
          totalAmount,
        razorpayOrderId:
          order.id,
      });

    booking.paymentId =
      payment._id;

    await booking.save();

    res.json({
      order,
      amount:
        totalAmount,
    });

  } catch (error) {
    res.status(500).json({
      message:
        error.message,
    });
  }
};

// VERIFY PAYMENT

export const verifyPayment =
  async (req, res) => {

    try {

      const {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
      } = req.body;

      const generatedSignature =
        crypto
          .createHmac(
            "sha256",
            process.env
              .RAZORPAY_KEY_SECRET
          )
          .update(
            razorpay_order_id +
            "|" +
            razorpay_payment_id
          )
          .digest("hex");

      if (
        generatedSignature !==
        razorpay_signature
      ) {
        return res.status(400).json({
          message:
            "Payment verification failed",
        });
      }

      const payment =
        await Payment.findOne({
          razorpayOrderId:
            razorpay_order_id,
        });

      payment.status =
        "Paid";

      payment.razorpayPaymentId =
        razorpay_payment_id;

      payment.razorpaySignature =
        razorpay_signature;

      await payment.save();

      const booking =
        await Booking.findById(
          payment.booking
        );

      booking.paymentStatus =
        "Paid";

      booking.status =
        "Payment Completed";

      await booking.save();

      await Property.findByIdAndUpdate(
        booking.property,
        {
          status: "Booked",
        }
      );

      res.json({
        success: true,
      });

    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };