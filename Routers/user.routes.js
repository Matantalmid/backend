const { Router } = require("express");
const router = Router();
const { User } = require("../models/users.model");
const {
  register,
  login,
  updateUser,
  getUsers,
  getOnlineUser,
  getUser,
} = require("../controllers/users.controller");
const { auth } = require("../middlewares/auth");

router.get("/", getUsers);

router.post("/register", register);

router.post("/login", login);

router.post("/getUser", getUser);

router.patch("/:id", updateUser);

router.get("/getOnlineUser", auth, getOnlineUser);
module.exports = router;
