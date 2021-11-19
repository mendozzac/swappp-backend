const express = require("express");
const {
  getSwimmers,
  createSwimmer,
} = require("../controllers/swimmersController");

const router = express.Router();

router.get("/swimmers", getSwimmers);

router.post("/register", createSwimmer);

module.exports = router;
