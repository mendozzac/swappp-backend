const chalk = require("chalk");
const debug = require("debug")("swappp:database");
const mongoose = require("mongoose");

const connectDB = () => {
  mongoose.connect(process.env.MONGODB_STRING, (error) => {
    if (error) {
      debug(chalk.red("Error en la conexión con la base de datos"));
      debug(chalk.red(error.message));
    }
    debug(chalk.magenta(`Conectado a la base de datos`));
  });
};

module.exports = connectDB;
