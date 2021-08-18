import express from "express";
import { createAccount } from "./customer.controller.js";

const Router = express.Router();

Router.post("/newcustomer", createAccount);

export default Router;
