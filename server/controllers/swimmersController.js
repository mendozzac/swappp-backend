const Swimmer = require("../../database/models/swimmer");

const getSwimmers = async (req, res) => {
  const swimmers = await Swimmer.find();
  res.json(swimmers);
};

module.exports = getSwimmers;
