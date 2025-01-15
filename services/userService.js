const User = require('../models/User');

const getAllUsers = async () => {
  return await User.find({});
};

const getUserByEmail = async (email) => {
  return await User.findOne({ email });
};

module.exports = {
  getAllUsers,
  getUserByEmail
}