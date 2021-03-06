const Swimmer = require("../../../database/models/swimmer");
require("../../../database/models/time");

const getSwimmers = async (req, res) => {
  const swimmers = await Swimmer.find();
  res.json(swimmers);
};

const getSwimmerById = async (req, res, next) => {
  const { idSwimmer } = req.params;

  try {
    const searchedSwimmer = await Swimmer.findById(idSwimmer).populate({
      path: "times",
    });
    if (searchedSwimmer) {
      res.json(searchedSwimmer);
    } else {
      const error = new Error("No se encuentra el nadador");
      error.code = 404;
      next(error);
    }
  } catch (error) {
    error.code = 400;
    next(error);
  }
};

const createSwimmer = async (req, res, next) => {
  try {
    const { idUser } = req.params;
    const swimmer = req.body;
    swimmer.user = idUser;
    const newSwimmer = await Swimmer.create(swimmer);
    res.status(201);
    res.json(newSwimmer);
  } catch (error) {
    error.code = 400;
    error.message = "No se puede crear la ficha";
    next(error);
  }
};

const deleteSwimmer = async (req, res, next) => {
  const { idSwimmer } = req.params;

  try {
    const searchedSwimmer = await Swimmer.findByIdAndDelete(idSwimmer);
    if (searchedSwimmer) {
      res.json({ id: searchedSwimmer.id });
    } else {
      const error = new Error("Swimmer not found");
      error.code = 404;
      next(error);
    }
  } catch (error) {
    error.code = 400;
    error.message = "Bad request";
    next(error);
  }
};

const updateSwimmer = async (req, res, next) => {
  try {
    const { id } = req.body;
    const newSwimmer = await Swimmer.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(newSwimmer);
  } catch (error) {
    error.message = "Cambio no realizado";
    error.code = 400;
    next(error);
  }
};

module.exports = {
  getSwimmers,
  getSwimmerById,
  createSwimmer,
  deleteSwimmer,
  updateSwimmer,
};
