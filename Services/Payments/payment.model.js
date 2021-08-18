import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      required: true,
    },
    productId: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    customerId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Payments = mongoose.model("payments", paymentSchema);

export default Payments;
