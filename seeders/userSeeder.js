//Model instantiation
const User = require("../models/User");

//Users seed and package import.
const usersSeed = require("./user");

const createUser = async () => {
  const user = new User(usersSeed);
  return await user.save();
};

const assignAddressToUser = async (user, userAddress) => {
  await User.findByIdAndUpdate(user._id, {
    $push: { addresses: userAddress },
  });
};

module.exports = { createUser, assignAddressToUser };
