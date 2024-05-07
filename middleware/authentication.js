const CustomError = require("../errors");
const { isTokenValid } = require("../utils");

const authenticateUser = (req, res, next) => {
  const { token } = req.signedCookies;

  if (!token) {
    throw new CustomError.UnauthenticatedError("'Authentication Invalid");
  }

  try {
    const { userId, name, email } = isTokenValid({ token });
    req.user = { userId, name, email };
    next();
  } catch (error) {
    throw new CustomError.UnauthenticatedError("Authentication Invalid");
  }
};

const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new CustomError.UnauthorizedError(
        "'Not authorized to access this route'"
      );
    }
    next();
  };
};

module.exports = {
  authenticateUser,
  authorizePermissions,
};
