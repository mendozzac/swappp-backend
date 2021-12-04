require("../../../database/models/user");

const verifyIsCoach = async (req, res, next) => {
  const { idUser } = req.params;
  const user = { idUser };
  if (user.isCoach === true) {
    return next();
  }
  const error = new Error("Tienes que ser entrenador");
  return next(error);
};

module.exports = verifyIsCoach;
