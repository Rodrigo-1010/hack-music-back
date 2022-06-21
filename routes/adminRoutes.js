const express = require("express");
const adminRouter = express.Router();
const adminController = require("../controllers/adminController");

adminRouter.get("/admins", adminController.index);
adminRouter.get("/admins/:id", adminController.show);
adminRouter.post("/admins", adminController.store);
adminRouter.patch("/admins/:id", adminController.update);
adminRouter.delete("/admins/:id", adminController.destroy);

module.exports = adminRouter;
