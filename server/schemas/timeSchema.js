const { Joi } = require("express-validation");

const timeSchema = {
  body: Joi.object({
    distance: Joi.number().required(),
    style: Joi.string().required(),
    date: Joi.date().required(),
    time: Joi.object({
      minutes: Joi.number().optional(),
      seconds: Joi.number().required(),
      tenths: Joi.number().required(),
    }),
  }),
};

module.exports = timeSchema;
