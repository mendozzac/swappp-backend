const chalk = require("chalk");
const debug = require("debug")("swappp:server");
const express = require("express");

const app = express();

const initializeServer = (port) => {
  const server = app.listen(port, () => {
    debug(chalk.yellow(`Escuchando en el puerto ${port}`));
  });

  server.on("error", (error) => {
    debug(chalk.red("No hay conexión con el puerto"));
    if (error.code === "EADDRINUSE") {
      debug(chalk.red(`El puerto ${port} está ocupado`));
    }
  });
};

module.exports = { initializeServer };
