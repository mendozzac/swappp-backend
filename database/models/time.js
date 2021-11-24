const { Schema, model } = require("mongoose");

const timeShema = new Schema({
  distance: { type: Number, require: true },
  style: { type: String, require: true },
  date: { type: String, require: true },
  time: {
    mintutes: { type: Number, require: true },
    seconds: { type: Number, require: true },
    tenths: { type: Number, require: true },
  },
  pool: { type: Number, require: true },
});

const Time = model("Time", timeShema);

module.exports = Time;
