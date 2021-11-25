const express = require("express");
const {
  createTime,
  updateTime,
} = require("../../controllers/timesController/timesController");
const path = require("../../path/path");

const router = express.Router();

router.post(path.swimmer, createTime);

router.put(path.times, updateTime);

module.exports = router;
