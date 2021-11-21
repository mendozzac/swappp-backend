const { Schema, model } = require("mongoose");

const swimmerSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  surname: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    default: "https://image.flaticon.com/icons/png/512/1228/1228248.png",
  },
  username: String,
  password: String,
  birthdate: {
    type: String,
    require: true,
  },
  height: Number,
  weight: Number,
  times: {
    distance: Number,
    style: String,
    date: String,
    time: String,
    pool: Number,
  },
});

const Swimmer = model("Swimmer", swimmerSchema);

module.exports = Swimmer;
