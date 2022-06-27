const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const adminSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String, 
  phone: Number,
});

//Este hook no funciona en queries UPDATEONE/UPDATEBYID, tiene que ser con save() para que se ejecute.
adminSchema.pre("save", async function (next) {
  const admin = this;
  if (!admin.isModified("password")) return next();
  try {
    admin.password = await bcrypt.hash(admin.password, 10);
  } catch (err) {
    return next(err);
  }
  next();
});

adminSchema.methods.comparePassword = async function (password) {
  const match = await bcrypt.compare(password, this.password);
  return match;
};

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
