const categoryRoutes = require("./categoryRoutes");
const productRoutes = require("./productRoutes");
const userRoutes = require("./userRoutes");
const adminRoutes = require("./adminRoutes");
const orderRoutes = require("./orderRoutes");
const addressRoutes = require("./addressRoutes");
const tokenRoutes = require("./tokenRoutes");

module.exports = (app) => {
  app.use("/categories", categoryRoutes);
  app.use("/products", productRoutes);
  app.use("/users", userRoutes);
  app.use("/admins", adminRoutes);
  app.use("/orders", orderRoutes);
  app.use("/addresses", addressRoutes);
  app.use("/tokens", tokenRoutes);
};
