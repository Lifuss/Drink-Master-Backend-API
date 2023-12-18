const Joi = require("joi");

const schemaPut = Joi.object({});

const categoryTypes = [
  "Ordinary Drink",
  "Cocktail",
  "Shake",
  "Other/Unknown",
  "Cocoa",
  "Shot",
  "Coffee/Tea",
  "Homemade Liqueur",
  "Punch/Party Drink",
  "Beer",
  "Soft Drink",
];

const glassTypes = [
  "Highball glass",
  "Cocktail glass",
  "Old-fashioned glass",
  "Whiskey Glass",
  "Collins glass",
  "Pousse cafe glass",
  "Champagne flute",
  "Whiskey sour glass",
  "Cordial glass",
  "Brandy snifter",
  "White wine glass",
  "Nick and Nora Glass",
  "Hurricane glass",
  "Coffee mug",
  "Shot glass",
  "Jar",
  "Irish coffee cup",
  "Punch bowl",
  "Pitcher",
  "Pint glass",
  "Copper Mug",
  "Wine Glass",
  "Beer mug",
  "Margarita/Coupette glass",
  "Beer pilsner",
  "Beer Glass",
  "Parfait glass",
  "Mason jar",
  "Margarita glass",
  "Martini Glass",
  "Balloon Glass",
  "Coupe Glass",
];

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

const schemaFavoriteId = Joi.object({
  cocktailId: Joi.string().hex().length(24).required(),
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
  schemaSubscribe,
  schemaFavoriteId,
  addDrinkSchema,
};
