const express = require("express");
const productRouter = express.Router();
const productController = require("../controllers/productController");

productRouter.get("/", productController.index);
productRouter.get("/:id", productController.show);
productRouter.post("/", productController.store);
productRouter.patch("/:id", productController.update);
productRouter.delete("/:id", productController.destroy);

module.exports = productRouter;
