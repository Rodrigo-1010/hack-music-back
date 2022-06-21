const express = require("express");
const userRouter = express.Router();
const userController = require("../controllers/userController");

userRouter.get("/", userController.index);
userRouter.get("/:id", userController.show);
userRouter.post("/", userController.store);
userRouter.patch("/:id", userController.update);
userRouter.delete("/:id", userController.destroy);

module.exports = userRouter;
