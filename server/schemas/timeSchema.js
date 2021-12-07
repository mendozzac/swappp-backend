const { Joi } = require("express-validation");

const timeSchema = {
  body: Joi.object({
    distance: Joi.number().required(),
    style: Joi.string().required(),
    date: Joi.date().optional(),
    time: Joi.string().require(),
  }),
};

module.exports = timeSchema;
