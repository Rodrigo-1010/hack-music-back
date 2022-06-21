const express = require("express");
const orderRouter = express.Router();
const orderController = require("../controllers/orderController");

orderRouter.get("/", orderController.index);
orderRouter.get("/:id", orderController.show);
orderRouter.post("/", orderController.store);

module.exports = orderRouter;
