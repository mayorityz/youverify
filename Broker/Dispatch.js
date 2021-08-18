import Broker from "./index.js";
import History from "../Services/Transactions/transaction.model.js";
import Payments from "../Services/Payments/payment.model.js";

export const Dispatch = async (route) => {
  const _Broker = new Broker();

  switch (route) {
    //   saves history
    case "transaction":
      await _Broker.consume("transaction", async (data) => {
        console.log(data);
        if (data) {
          let newTransHistory = new History({ ...data });
          await newTransHistory.save();
          console.log("new history saved");
        }
      });
      break;

    //   saves to payment
    case "order":
      await _Broker.consume("order", async (data) => {
        if (data) {
          let payment = new Payments({ ...data });
          await payment.save();
          console.log("payment saved successfully");
          //   consume
          await _Broker.produce("transaction", data);
        }
      });
      break;

    default:
      break;
  }
};

export default Dispatch;
