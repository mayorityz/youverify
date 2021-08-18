import prodModel from "./product.model.js";

export const newProduct = async (req, res) => {
  const { productId, title, amount, desc } = req.body;
  const product = new prodModel({ productId, title, amount, desc });
  product.save((er, prod_) => {
    er
      ? res.status(400).json({ status: false, message: err.message })
      : res
          .status(200)
          .json({ status: true, message: "product created successfully" });
  });
};
