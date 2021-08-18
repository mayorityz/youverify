import express from "express";
import { newProduct } from "./product.controller.js";

const Router = express.Router();

Router.post("/createproduct", newProduct);

export default Router;
// 611bd102f6060336b861966a
