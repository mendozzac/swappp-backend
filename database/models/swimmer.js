const { Schema, model, Types } = require("mongoose");

const swimmerSchema = new Schema({
  name: {
    type: String,
    default: "Fernando",
  },
  surname: {
    type: String,
    default: "Mendoza"
  },
  image: {
    type: String,
    default: "https://image.flaticon.com/icons/png/512/1228/1228248.png",
  },
  user: {
    type: Types.ObjectId,
    ref: "User",
    require: true,
  },
  birthdate: {
    type: Date,
    require: true,
  },
  height: {
    type: Number,
    default: 0,
  },
  weight: {
    type: Number,
    default: 0,
  },
  times: {
    type: [Types.ObjectId],
    ref: "Time",
    default: [],
  },
});

const Swimmer = model("Swimmer", swimmerSchema);

module.exports = Swimmer;
