const express = require("express");
const { validate } = require("express-validation");
const {
  createExercise,
  updateExercise,
} = require("../../controllers/exercisesController/exercisesController");
const path = require("../../path/path");
const exerciseSchema = require("../../schemas/excersiseSchema");

const router = express.Router();

router.post(path.session, validate(exerciseSchema), createExercise);

router.put(path.exercise, validate(exerciseSchema), updateExercise);

module.exports = router;
