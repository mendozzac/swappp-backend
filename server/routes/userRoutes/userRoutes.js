const express = require("express");
const { validate } = require("express-validation");
const {
  userLogin,
  userSignUp,
} = require("../../controllers/userController/userController");
const path = require("../../path/path");
const userSchema = require("../../schemas/userShema");

const router = express.Router();

router.post(path.login, validate(userSchema), userLogin);

router.post(path.register, userSignUp);

module.exports = router;
