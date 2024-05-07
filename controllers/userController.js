const { NOT_MODIFIED } = require("http-status-codes");

const getAllUsers = (req, res, next) => {
  res.send("All users");
};
const getCurrentUser = (req, res, next) => {
  res.send("Current users");
};
const getSingleUser = (req, res, next) => {
  res.send("Single user");
};
const updateUser = (req, res, next) => {
  res.send("All users");
};
const updatePassword = (req, res, next) => {
  res.send("All users");
};

module.exports = {
  getAllUsers,
  getCurrentUser,
  getSingleUser,
  updateUser,
  updatePassword,
};
