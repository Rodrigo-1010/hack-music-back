const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  phone: Number,
  address: [{ type: Schema.ObjectId, ref: "Address" }], //array con id de referencias a Address
  orders: [{ type: Schema.ObjectId, ref: "Order" }], //array con id de referencias a Order
});

// userSchema.pre("save", async function (next) {
//   user.password = await bcrypt.hash(user.password, 10)
// });

const User = mongoose.model("User", userSchema);

module.exports = User;
