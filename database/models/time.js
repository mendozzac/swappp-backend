const { Schema, model } = require("mongoose");

const timeShema = new Schema({
  distance: { type: Number, require: true },
  style: { type: String, require: true },
  date: { type: String, require: true },
  time: { type: String, require: true },
  pool: { type: Number, require: true },
});

const Time = model("Time", timeShema);

module.exports = Time;
