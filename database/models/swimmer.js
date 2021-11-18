const { Schema, model } = require("mongoose");

const swimmerSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  usename: String,
  password: String,
  surname: {
    type: String,
    require: true,
  },
  birthdate: {
    type: Date,
    require: true,
  },
  height: Number,
  weight: Number,
  times: {
    distance: Number,
    style: String,
    date: Date,
    time: String,
    pool: Number,
  },
});

const Swimmer = model("Swimmer", swimmerSchema);

module.exports = Swimmer;
