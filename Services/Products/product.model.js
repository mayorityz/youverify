import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    productId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    amount: {
      type: String,
      required: true,
    },
    productStatus: {
      type: String,
      default: "in-stock",
    },
    desc: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Products = mongoose.model("products", productSchema);

export default Products;
