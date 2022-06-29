const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const userSchema = new Schema({
  firstName: { type: String, maxLength: 30, required: [true, "First name is required"] },
  lastName: { type: String, maxLength: 30, required: [true, "Last name is required"] },
  email: {
    type: String,
    maxLength: 30,
    required: [true, "Email is required"],
    unique: true,
  },
  password: { type: String, maxLength: 30, required: [true, "Password is required"] },
  phone: { type: Number, maxLength: 20 },
  addresses: [{ type: Schema.ObjectId, ref: "Address" }], //array con id de referencias a Address
  orders: [{ type: Schema.ObjectId, ref: "Order" }], //array con id de referencias a Order
});

//Este hook no funciona en queries UPDATEONE/UPDATEBYID, tiene que ser con save() para que se ejecute.
userSchema.pre("save", async function (next) {
  const user = this;

  //Only hash the password if it has been modified (or is new)
  if (!user.isModified("password")) return next();
  try {
    user.password = await bcrypt.hash(user.password, 10);
  } catch (err) {
    return next(err);
  }
  next();
});

userSchema.methods.comparePassword = async function (password) {
  const match = await bcrypt.compare(password, this.password);
  return match;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
