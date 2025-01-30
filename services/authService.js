const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const sendMail = require("../utils/sendMail");
require("dotenv").config();

const register = async (userData) => {
  const { email, password, userName, ...rest } = userData;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("Email Already Exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const newUser = new User({
    email,
    password: hashedPassword,
    userName,
    ...rest,
  });
  await newUser.save();
  return { email: newUser.email, id: newUser._id };
};

const login = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  return { userName: user.userName, email: user.email, role: user.role, token, };
};

const forgotPassword = async (email) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found");

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "10m",
  });

  const resetURL = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;

  await sendMail(
    email,
    "Password Reset Link",
    ` You are receiving this because you (or someone else) have requested the reset of the password for your account.\n
      Please click on the following link, or paste this into your browser to complete the process:\n
      ${resetURL}\n\
      If you did not request this, please ignore this email and your password will remain unchanged.\n`
  );
  return resetURL;
};

const resetPassword = async (token, newPassword) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const userId = decoded.userId;
  const user = await User.findById({ _id: userId});
  console.log(decoded, newPassword, user);
  if (!user) throw new Error("Invalid token or user not found.");

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(newPassword, salt);
  await user.save();
};

module.exports = {
  register,
  login,
  forgotPassword,
  resetPassword,
};
