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

userSchema.pre("save", function (next) {
  const user = this;

  //Only hash the password if it has been modified (or is new)
  if (!user.isModified("password")) return next();

  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;

  next();
});

// userSchema.methods.comparePassword = function (candidatePassword, cb) {
//   bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
//     if (err) return cb(err);
//     cb(null, isMatch);
//   });
// };

const User = mongoose.model("User", userSchema);

module.exports = User;
