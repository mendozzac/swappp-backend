const express = require("express");
const coachLogin = require("../../controllers/coachController/coachController");
const path = require("../../path/path");

const router = express.Router();

router.post(path.login, coachLogin);

module.exports = router;
