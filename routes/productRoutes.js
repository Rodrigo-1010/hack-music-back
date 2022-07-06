const express = require("express");
const productRouter = express.Router();
const productController = require("../controllers/productController");
const { expressjwt: jwt } = require("express-jwt");
const  isAdmin  = require("../middlewares/isAdmin");

productRouter.get("/products", productController.index);
productRouter.get("/products/:id", productController.show);

//Admin Routes!
productRouter.use(
  "/products",
  jwt({ secret: process.env.JWT_SECRET_KEY, algorithms: ["HS256"] }),
  isAdmin,
);
productRouter.post("/products", productController.store);
productRouter.patch("/products/:id", productController.update);
productRouter.delete("/products/:id", productController.destroy);

module.exports = productRouter;
