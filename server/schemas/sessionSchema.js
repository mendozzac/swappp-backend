const { Joi } = require("express-validation");

const sessionSchema = {
  body: Joi.object({
    date: Joi.date().required(),
    exercises: Joi.array().required(),
  }),
};

module.exports = sessionSchema;
