const Session = require("../../../database/models/session");
require("../../../database/models/exercise");

const getSessions = async (req, res) => {
  const sessions = await Session.find();
  res.json(sessions);
};

const getSessionById = async (req, res, next) => {
  const { idSession } = req.params;

  try {
    const searchedSession = await Session.findById(idSession).populate({
      path: "exercises",
    });
    if (searchedSession) {
      res.json(searchedSession);
    } else {
      const error = new Error("No se encuentra el entrenamiento");
      error.code = 404;
      next(error);
    }
  } catch (error) {
    error.code = 400;
    next(error);
  }
};

const createSession = async (req, res, next) => {
  try {
    const session = req.body;
    const newSession = await Session.create(session);
    res.status(201);
    res.json(newSession);
  } catch (error) {
    error.code = 400;
    error.message = "No se puede crear el entrenamiento";
    next(error);
  }
};

const updateSession = async (req, res, next) => {
  try {
    const { id } = req.body;
    const newSession = await Session.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(newSession);
  } catch (error) {
    error.message = "Cambio no realizado";
    error.code = 400;
    next(error);
  }
};

module.exports = { getSessions, getSessionById, createSession, updateSession };
