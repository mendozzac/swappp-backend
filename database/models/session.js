const { Schema, model, Types } = require("mongoose");

const sessionSchema = new Schema({
  date: {
    type: Date,
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
