const express = require("express");
const categoryRouter = express.Router();
const categoryController = require("../controllers/categoryController");
const { expressjwt: jwt } = require("express-jwt");

categoryRouter.get("/categories", categoryController.index);
categoryRouter.get("/categories/:id", categoryController.show);

//Admin Routes!
categoryRouter.use(
  "/categories",
  jwt({ secret: process.env.JWT_SECRET_KEY, algorithms: ["HS256"] }),
);
categoryRouter.post("/categories", categoryController.store);
categoryRouter.patch("/categories/:id", categoryController.update);
categoryRouter.delete("/categories/:id", categoryController.destroy);

module.exports = categoryRouter;
