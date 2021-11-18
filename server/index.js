const cors = require("cors");
const chalk = require("chalk");
const debug = require("debug")("swappp:server");
const morgan = require("morgan");
const express = require("express");
const swimmersRoutes = require("./routes/swimmersRoutes");

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

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use("/", swimmersRoutes);

module.exports = { initializeServer };
