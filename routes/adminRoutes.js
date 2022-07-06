const express = require("express");
const adminRouter = express.Router();
const adminController = require("../controllers/adminController");
const { expressjwt: jwt } = require("express-jwt");
const isAdmin = require("../middlewares/isAdmin");

adminRouter.use(
  "/admins",
  jwt({ secret: process.env.JWT_SECRET_KEY, algorithms: ["HS256"] }),
  isAdmin,
);
adminRouter.get("/admins", adminController.index);
adminRouter.get("/admins/:id", adminController.show);
adminRouter.post("/admins", adminController.store);
adminRouter.patch("/admins/:id", adminController.update);
adminRouter.delete("/admins/:id", adminController.destroy);

module.exports = adminRouter;
