const { Joi } = require("express-validation");

const userSchema = {
  body: Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
    isCoach: Joi.boolean().optional(),
  }),
};

module.exports = userSchema;
