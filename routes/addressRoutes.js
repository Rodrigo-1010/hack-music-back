const express = require("express");
const addressRouter = express.Router();
const addressController = require("../controllers/addressController");
const { expressjwt: jwt } = require("express-jwt");

addressRouter.use("/addresses", jwt({ secret: process.env.JWT_SECRET_KEY, algorithms: ["HS256"] }));
addressRouter.get("/addresses", addressController.index);
addressRouter.get("/addresses/:id", addressController.show);
addressRouter.post("/addresses", addressController.store);
addressRouter.patch("/addresses/:id", addressController.update);
addressRouter.delete("/addresses/:id", addressController.destroy);

module.exports = addressRouter;
