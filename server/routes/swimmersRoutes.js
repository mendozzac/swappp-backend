const express = require("express");
const {
  getSwimmers,
  createSwimmer,
  deleteSwimmer,
  getSwimmerById,
} = require("../controllers/swimmersController");
const path = require("../path/path");

const router = express.Router();

router.get(path.swimmers, getSwimmers);

router.get(path.swimmer, getSwimmerById);

router.post(path.register, createSwimmer);

router.delete(path.swimmer, deleteSwimmer);

module.exports = router;
