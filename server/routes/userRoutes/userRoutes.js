const express = require("express");
const { validate } = require("express-validation");
const {
  userLogin,
  userSignUp,
  getUsers,
  deleteUser,
} = require("../../controllers/userController/userController");
const path = require("../../path/path");
const userSchema = require("../../schemas/userShema");

const router = express.Router();

router.post(path.login, validate(userSchema), userLogin);

router.post(path.register, userSignUp);

router.get(path.register, getUsers);

router.delete(`${path.swimmer}/:idUser`, deleteUser);

module.exports = router;
