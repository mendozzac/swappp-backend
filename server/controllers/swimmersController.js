const Swimmer = require("../../database/models/swimmer");

const getSwimmers = async (req, res) => {
  const swimmers = await Swimmer.find();
  res.json(swimmers);
};

const createSwimmer = async (req, res, next) => {
  try {
    const swimmer = req.body;
    const newSwimmer = await Swimmer.create(swimmer);
    res.status(201).json(newSwimmer);
  } catch (error) {
    error.code = 400;
    error.message = "No se puede crear la ficha";
    next(error);
  }
};

module.exports = { getSwimmers, createSwimmer };
