const express = require("express");
const {
  createExercise,
  updateExercise,
} = require("../../controllers/exercisesController/exercisesController");
const path = require("../../path/path");

const router = express.Router();

router.post(path.session, createExercise);

router.put(path.exercise, updateExercise);

module.exports = router;
