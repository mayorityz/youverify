import paymentModel from "./payment.model.js";
import Broker from "../../Broker/index.js";

export const collectPayment = async (req, res) => {
  const { orderId, productId, amount } = req.body;
  let newPayment = new paymentModel({ orderId, productId, amount });
  newPayment.save((err, payment) => {
    if (err) {
      res.status(400).json({ status: false, message: "Err " + err.message });
    } else {
      // produce here!
      let _broker = new Broker();
      _broker.produce("transaction", { ...payment });
      res
        .status(200)
        .json({ status: true, message: "payment is being processed" });
    }
  });
};
