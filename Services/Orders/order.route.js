import express from "express";
import { newOrder } from "./order.controller.js";

const Router = express.Router();

Router.post("/neworder", newOrder);

export default Router;
// 611bd102f6060336b861966a
