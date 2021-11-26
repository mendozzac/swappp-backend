const { model, Schema } = require("mongoose");

const userSchema = new Schema({
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
  isCoach: {
    type: Boolean,
    default: false,
  },
});

const User = model("User", userSchema, "coaches");

module.exports = User;
