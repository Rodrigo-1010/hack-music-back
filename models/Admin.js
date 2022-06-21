const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const adminSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  phone: Number,
});

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
