import customerModel from "./customer.model.js";

export const createAccount = async (req, res) => {
  const { username, email, password, firstname, lastname } = req.body;
  const NEW_ACCOUNT = new customerModel({
    username,
    email,
    password,
    firstname,
    lastname,
  });
  await NEW_ACCOUNT.save((er, user) => {
    er
      ? res.status(400).send("Err : ", err.message)
      : res
          .status(200)
          .send({ status: true, message: "account created successfully..." });
  });
};
