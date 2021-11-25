const cors = require("cors");
const chalk = require("chalk");
const debug = require("debug")("swappp:server");
const morgan = require("morgan");
const express = require("express");
const coachRoutes = require("./routes/coachRoutes/coachRoutes");
const swimmersRoutes = require("./routes/swimmersRoutes/swimmersRoutes");
const timesRoutes = require("./routes/timesRoutes/timesRoutes");
const sessionsRoutes = require("./routes/sessionsRoutes/sessionsRoutes");
const exercisesRoutes = require("./routes/exercisesRoutes/exercisesRoutes");
const { notFoundHandler, generalErrorHandler } = require("./middlewares/error");

const app = express();

const initializeServer = (port) =>
  new Promise((resolve, reject) => {
    const server = app.listen(port, () => {
      debug(chalk.yellow(`Escuchando en el puerto ${port}`));
    });

    server.on("error", (error) => {
      debug(chalk.red("No hay conexión con el puerto"));
      if (error.code === "EADDRINUSE") {
        debug(chalk.red(`El puerto ${port} está ocupado`));
      }
      reject();
    });
    resolve(server);
  });

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use("/", coachRoutes);
app.use("/", swimmersRoutes);
app.use("/", timesRoutes);
app.use("/", sessionsRoutes);
app.use("/", exercisesRoutes);

app.use(notFoundHandler);
app.use(generalErrorHandler);

module.exports = { initializeServer, app };
