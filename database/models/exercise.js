const { Schema, model } = require("mongoose");

const exerciseShema = new Schema({
  meters: {
    type: Number,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
});

const Exercise = model("Exercise", exerciseShema);

module.exports = Exercise;
