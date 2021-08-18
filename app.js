import express from "express";
import cors from "cors";
import DB_CONNECTION from "./Database/index.js";
import customerRoute from "./Services/Customers/customer.route.js";
import orderRoute from "./Services/Orders/order.route.js";
import Dispatch from "./Broker/Dispatch.js";

const app = express();
const PORT = process.env.PORT || 8084;

// app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// ! versioning my api...
app.use("/api/v1/customer", customerRoute);
app.use("/api/v1/order", orderRoute);

app.use((req, res, next) => {
  res.status(404).send("Sorry can't find that!");
});

// catch server errors and respond with 500
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

try {
  DB_CONNECTION.then(() => {
    console.log("listening");
    app.listen(PORT, () => {
      console.log("connecting DB ...");
      console.log(`running on port ${PORT}`);
      //! consumers
      Dispatch("transaction");
      Dispatch("order");
    });
  });
} catch (error) {
  console.log(error.message);
  res.status(500).send(error.message);
}
