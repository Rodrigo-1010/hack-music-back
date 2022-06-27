//Model instantiation
const User = require("../models/User");

//Users seed and package import.
const usersSeed = require("./user");

const createUser = async () => {
  const user = new User(usersSeed);
  return await user.save();
};

module.exports = { createUser };
