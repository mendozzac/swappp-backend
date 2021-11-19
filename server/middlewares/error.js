const debug = require("debug")("swappp:error");

const notFoundHandler = (req, res) => {
  res.status(404).json({ error: "No se encuentra la ruta" });
};

// eslint-disable-next-line no-unused-vars
const generalErrorHandler = (error, req, res, next) => {
  debug("Error", error.message);
  const message = error.code ? error.message : "Error general";
  res.status(error.code || 500).json({ error: message });
};

module.exports = { notFoundHandler, generalErrorHandler };
