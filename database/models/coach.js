const { model, Schema } = require("mongoose");

const coachSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  username: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
});

const Coach = model("Coach", coachSchema);

module.exports = Coach;
