const express = require("express");
const userRouter = express.Router();
const userController = require("../controllers/userController");
const { expressjwt: jwt } = require("express-jwt");

userRouter.get("/users", userController.index);
userRouter.get("/users/:id", userController.show);
userRouter.post("/users", userController.store);
userRouter.patch("/users/:id", userController.update);

userRouter.use("/users", jwt({ secret: process.env.JWT_SECRET_KEY, algorithms: ["HS256"] }));

userRouter.delete("/users/:id", userController.destroy);

module.exports = userRouter;
