const express = require("express");
const adminRouter = express.Router();
const adminController = require("../controllers/adminController");

adminRouter.get("/", adminController.index);
adminRouter.get("/:id", adminController.show);
adminRouter.post("/", adminController.store);
adminRouter.patch("/:id", adminController.update);
adminRouter.delete("/:id", adminController.destroy);

module.exports = adminRouter;
