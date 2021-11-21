const express = require("express");
const {
  getSwimmers,
  createSwimmer,
} = require("../controllers/swimmersController");
const path = require("../path/path");

const router = express.Router();

router.get(path.swimmers, getSwimmers);

router.post(path.register, createSwimmer);

module.exports = router;
