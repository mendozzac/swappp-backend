const Swimmer = require("../../../database/models/swimmer");
const Time = require("../../../database/models/time");

const createTime = async (req, res, next) => {
  try {
    const time = req.body;
    const newTime = await Time.create(time);
    await Swimmer.findOneAndUpdate(
      { id: req.idSwimmer },
      { $push: { times: newTime.id } }
    );
    res.status(201);
    res.json(newTime);
  } catch (error) {
    error.code = 400;
    error.message = "No se puede registar la marca";
    next(error);
  }
};

const updateTime = async (req, res, next) => {
  try {
    const { id } = req.body;
    const newTime = await Time.findByIdAndUpdate(id, req.body, { new: true });
    res.json(newTime);
  } catch (error) {
    error.message = "Cambio no realizado";
    error.code = 400;
    next(error);
  }
};

module.exports = { createTime, updateTime };
