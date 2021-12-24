const { Joi } = require("express-validation");

const exerciseSchema = {
  body: Joi.object({
    meters: Joi.number().required(),
    description: Joi.string().required(),
  }),
};

module.exports = exerciseSchema;
