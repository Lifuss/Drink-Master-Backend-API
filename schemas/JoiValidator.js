const Joi = require("joi");

const schemaPut = Joi.object({});

const schemaRegister = Joi.object({
  name: Joi.string().required(),
  date: Joi.date().required().max("now").iso(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "ua"] } })
    .required(),
  password: Joi.string().required(),
});

const schemaLogin = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "ua"] } })
    .required(),
  password: Joi.string().required(),
});

const schemaUpdate = Joi.object({
  name: Joi.string(),
  date: Joi.date().max("now").iso(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net", "ua"] },
  }),
  password: Joi.string(),
});

const schemaSubscribe = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "ua"] } })
    .required(),
});

module.exports = {
  schemaPut,
  schemaRegister,
  schemaLogin,
  schemaUpdate,
  schemaSubscribe,
};
