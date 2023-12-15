const Joi = require("joi");

const schemaPut = Joi.object({});

const schemaRegister = Joi.object({
  name: Joi.string().required(),
  date: Joi.date().required().max("now").iso(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const schemaLogin = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

module.exports = {
  schemaPut,
  schemaRegister,
  schemaLogin,
};
