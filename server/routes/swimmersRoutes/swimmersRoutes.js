const express = require("express");
const {
  getSwimmers,
  createSwimmer,
  deleteSwimmer,
  getSwimmerById,
  updateSwimmer,
} = require("../../controllers/swimmersController/swimmersController");
const uploadFirebase = require("../../middlewares/firebase");
const upload = require("../../middlewares/uploadLocal");
const path = require("../../path/path");

const router = express.Router();

router.get(path.swimmers, getSwimmers);

router.get(path.swimmer, getSwimmerById);

router.post(
  path.newSwimmer,
  upload.single("image"),
  uploadFirebase,
  createSwimmer
);

router.delete(path.swimmer, deleteSwimmer);

router.put(path.swimmer, updateSwimmer);

module.exports = router;
