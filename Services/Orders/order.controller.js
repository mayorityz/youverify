import orderModel from "./order.model.js";
import MsgBroker from "./../../Broker/index.js";
import uniqid from "uniqid";

export const newOrder = async (req, res) => {
  const { customerId, productId, amount } = req.body;
  let orderId = uniqid();

  let broker = new MsgBroker();

  try {
    const order = new orderModel({ customerId, productId, amount, orderId });
    await order.save((er, _order) => {
      if (er) {
        res.status(400).send("Err : ", err.message);
      } else {
        broker.produce("order", {
          customerId,
          productId,
          amount,
          orderId,
        });
        res
          .status(200)
          .send({
            status: true,
            message: "Order Placed Successfully!",
            details: _order,
          });
      }
    });
  } catch (error) {
    res
      .status(400)
      .json({ status: false, message: "Error : " + error.message });
  }
};
