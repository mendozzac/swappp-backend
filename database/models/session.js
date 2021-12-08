const { Schema, model, Types } = require("mongoose");

const sessionSchema = new Schema({
  day: {
    type: String,
    require: true,
  },
  exercises: {
    type: [Types.ObjectId],
    ref: "Exercise",
    require: true,
  },
});

const Session = model("Session", sessionSchema);

module.exports = Session;
