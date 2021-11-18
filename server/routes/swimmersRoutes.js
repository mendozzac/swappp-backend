const express = require("express");
const getSwimmers = require("../controllers/swimmersController");

const router = express.Router();

router.get("/swimmers", getSwimmers);

module.exports = router;
