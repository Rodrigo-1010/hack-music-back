const categoryRoutes = require("./categoryRoutes");
const productRoutes = require("./productRoutes");
const userRoutes = require("./userRoutes");
const adminRoutes = require("./adminRoutes");
const orderRoutes = require("./orderRoutes");
const addressRoutes = require("./addressRoutes");
const tokenRoutes = require("./tokenRoutes");
const resetRoutes = require("./resetRoutes");

module.exports = (app) => {
  app.use(categoryRoutes);
  app.use(productRoutes);
  app.use(userRoutes);
  app.use(adminRoutes);
  app.use(orderRoutes);
  app.use(addressRoutes);
  app.use(tokenRoutes);
  app.use(resetRoutes);
};
