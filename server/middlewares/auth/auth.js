const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const authHeather = req.header("Authorization");
  if (!authHeather) {
    const error = new Error("No te has identificado");
    error.code = 401;
    next(error);
  } else {
    const token = authHeather.split(" ")[1];
    if (!token) {
      const error = new Error("Identificación incorrecta");
      error.code = 401;
      next(error);
    } else {
      try {
        const user = jwt.verify(token, process.env.SECRET);
        req.userId = user.id;
        next();
      } catch (error) {
        error.message("Token incorrecto");
        error.code = 401;
        next(error);
      }
    }
  }
};

module.exports = auth;
