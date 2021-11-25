const Exercise = require("../../../database/models/exercise");

const createExercise = async (req, res, next) => {
  try {
    const exercise = req.body;
    const newExercise = await Exercise.create(exercise);
    res.status(201);
    res.json(newExercise);
  } catch (error) {
    error.code = 400;
    error.message = "No se puede crear el ejercicio";
    next(error);
  }
};

const updateExercise = async (req, res, next) => {
  try {
    const { id } = req.body;
    const newExercise = await Exercise.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(newExercise);
  } catch (error) {
    error.message = "Cambio no realizado";
    error.code = 400;
    next(error);
  }
};

module.exports = { createExercise, updateExercise };
