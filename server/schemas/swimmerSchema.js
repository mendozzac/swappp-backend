const { Joi } = require("express-validation");

const swimmerSchema = {
  body: Joi.object({
    name: Joi.string().required(),
    surname: Joi.string().required(),
    user: Joi.object({}),
    height: Joi.number().optional(),
    weight: Joi.number().optional(),
    image: Joi.string().optional(),
    times: Joi.array().optional(),
  }),
};

module.exports = swimmerSchema;
