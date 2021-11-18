const chalk = require("chalk");
const debug = require("debug")("swappp:database");
const mongoose = require("mongoose");

const connectDB = () =>
  new Promise((resolve, reject) => {
    mongoose.set("toJSON", {
      virtuals: true,
      transform: (doc, ret) => {
        // eslint-disable-next-line no-underscore-dangle
        delete ret._id;
        // eslint-disable-next-line no-underscore-dangle
        delete ret._v;
      },
    });

    mongoose.connect(process.env.MONGODB_STRING, (error) => {
      if (error) {
        debug(chalk.red("Error en la conexión con la base de datos"));
        debug(chalk.red(error.message));
        reject();
      }
      debug(chalk.magenta(`Conectado a la base de datos`));
      resolve();
    });

    mongoose.connection.on("close", () => {
      debug(chalk.yellow("La Base de Datos está desconectada"));
      resolve();
    });
  });

module.exports = connectDB;
