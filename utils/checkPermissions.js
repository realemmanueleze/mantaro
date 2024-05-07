const CustomError = require("../errors");

const checkPermissions = (userMakingRequest, requestedUserId) => {
  console.log(userMakingRequest);
  if (userMakingRequest.role === "admin") return;
  if (userMakingRequest.userId === requestedUserId.toString()) return;
  throw new CustomError.UnauthorizedError(
    "Not authorized to access this route"
  );
};

module.exports = checkPermissions;
