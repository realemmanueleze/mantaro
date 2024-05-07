const { Router } = require("express");
const {
  getAllUsers,
  getCurrentUser,
  getSingleUser,
  updateUser,
  updatePassword,
} = require("../controllers/userController");
const {
  authenticateUser,
  authorizePermissions,
} = require("../middleware/authentication");

const router = Router();

router.get("/", authenticateUser, authorizePermissions("admin"), getAllUsers);
router.get("/showMe", authenticateUser, getCurrentUser);
router.patch("/updateUser", authenticateUser, updateUser);
router.post("/updatePassword", authenticateUser, updatePassword);
router.get("/:id", authenticateUser, getSingleUser);

module.exports = router;
