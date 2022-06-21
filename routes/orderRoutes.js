const express = require("express");
const orderRouter = express.Router();
const orderController = require("../controllers/orderController");

orderRouter.get("/orders", orderController.index);
orderRouter.get("/orders/:id", orderController.show);
orderRouter.post("/orders", orderController.store);

module.exports = orderRouter;
