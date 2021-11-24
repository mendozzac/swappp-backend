const { Schema, model, Types } = require("mongoose");

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
  username: { type: String, require: true },
  password: { type: String, require: true },
  birthdate: {
    type: String,
    require: true,
  },
  height: Number,
  weight: Number,
  times: {
    type: [Types.ObjectId],
    ref: "Time",
  },
});

const Swimmer = model("Swimmer", swimmerSchema);

module.exports = Swimmer;
