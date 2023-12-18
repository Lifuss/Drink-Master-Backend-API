const Joi = require("joi");

const schemaPut = Joi.object({});

const { categoryTypes, glassTypes } = require("../services/constants");

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

const addDrinkSchema = Joi.object({
  drink: Joi.string().required(),
  description: Joi.string().required(),
  category: Joi.string()
    .valid(...categoryTypes)
    .required(),
  glass: Joi.string()
    .valid(...glassTypes)
    .required(),
  alcoholic: Joi.string().valid("Alcoholic", "Non alcoholic"),
  ingredients: Joi.array().items(
    Joi.object({
      title: Joi.string(),
      measure: Joi.string(),
    }).required()
  ),
  instructions: Joi.string(),
  owner: Joi.string(),
});

module.exports = {
  schemaPut,
  schemaRegister,
  schemaLogin,
  schemaUpdate,
  addDrinkSchema,
};
