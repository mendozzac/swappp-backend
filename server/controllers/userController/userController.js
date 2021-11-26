require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../../database/models/user");

const userLogin = async (req, res, next) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    const error = new Error("Usuario no encontrado");
    error.code = 401;
    return next(error);
  }
  const rightPassword = await bcrypt.compare(password, user.password);
  if (!rightPassword) {
    const error = new Error("Contraseña incorrecta");
    error.code = 400;
    return next(error);
  }
  const token = jwt.sign(
    {
      id: user.id,
      name: user.name,
    },
    process.env.SECRET
  );
  res.json({ token });
};

const userSignUp = async (req, res, next) => {
  const newUser = req.body;
  const user = await User.findOne({ username: newUser.username });
  if (user) {
    const error = new Error("Usuario ya registrado");
    error.code = 400;
    return next(error);
  }
  newUser.password = await bcrypt.hash(newUser.password, 10);
  User.create(newUser);
  res.json().status(200);
};

module.exports = { userLogin, userSignUp };
