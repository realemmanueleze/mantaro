const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const { isTokenValid, createTokenUser } = require("../utils");

const authenticateUser = (req, res, next) => {
  const { token } = req.signedCookies;

  if (!token) {
    throw new CustomError.UnauthenticatedError(
      "You are not authorized to access this information"
    );
  }

  try {
    const { userId, name, email } = isTokenValid({ token });
    req.user = { userId, name, email };
    next();
  } catch (error) {
    throw new CustomError.UnauthenticatedError(
      "You are not authorized to access this information"
    );
  }
};

const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new CustomError.UnauthorizedError("Authorization Error");
    }
    next();
  };
};

module.exports = {
  authenticateUser,
  authorizePermissions,
};
