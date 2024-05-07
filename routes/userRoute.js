const { Router } = require("express");
const {
  getAllUsers,
  getCurrentUser,
  getSingleUser,
  updateUser,
  updatePassword,
} = require("../controllers/userController");

const router = Router();

router.get("/", getAllUsers);
router.get("/showMe", getCurrentUser);
router.patch("/updateUser", updateUser);
router.post("/updatePassword", updatePassword);
router.get("/:id", getSingleUser);

module.exports = router;
