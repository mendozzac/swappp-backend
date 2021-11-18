const chalk = require("chalk");
const debug = require("debug")("swappp:database");
const mongoose = require("mongoose");

const connectDB = () => {
  mongoose.connect(process.env.MONGODB_STRING);
  debug(chalk.magenta(`Conectado a la base de datos`));
};

module.exports = connectDB;
