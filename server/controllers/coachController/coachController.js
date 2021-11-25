require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Coach = require("../../../database/models/coach");

const coachLogin = async (req, res, next) => {
  const { username, password } = req.body;
  const coach = await Coach.findOne({ username });
  if (!coach) {
    const error = new Error("Usuario no encontrado");
    error.code = 401;
    next(error);
  } else {
    const rightPassword = await bcrypt.compare(password, coach.password);
    if (!rightPassword) {
      const error = new Error("Contraseña incorrecta");
      error.code = 400;
      next(error);
    } else {
      const token = jwt.sign(
        {
          id: coach.id,
          name: coach.name,
        },
        process.env.SECRET
      );
      res.json({ token });
    }
  }
};

module.exports = coachLogin;
