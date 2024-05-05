const register = async (req, res, next) => {
  res.send("Register");
};
const login = async (req, res, next) => {
  res.send("Login");
};
const logout = async (req, res, next) => {
  res.send("Logout");
};

module.exports = {
  register,
  login,
  logout,
};
