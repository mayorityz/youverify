import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    customerId: {
      type: String,
      required: true,
    },
    amount: {
      type: String,
      required: true,
    },
    orderStatus: {
      type: String,
      default: "pending",
    },
    productId: {
      type: String,
      required: true,
    },
    orderId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Orders = mongoose.model("orders", orderSchema);

export default Orders;
