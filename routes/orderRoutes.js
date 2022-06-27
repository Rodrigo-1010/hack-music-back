const express = require("express");
const orderRouter = express.Router();
const orderController = require("../controllers/orderController");
const { expressjwt: jwt } = require("express-jwt");

orderRouter.use(
  "/orders",
  jwt({ secret: process.env.JWT_SECRET_KEY, algorithms: ["HS256"] }),
);
orderRouter.get("/orders", orderController.index);
orderRouter.get("/orders/:id", orderController.show);
orderRouter.post("/orders", orderController.store);

module.exports = orderRouter;
