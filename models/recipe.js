const { Schema, model } = require("mongoose");
// const { handleMongooseError } = require("../services");
const Joi = require("joi");

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

const recipeSchema = new Schema(
  {
    drink: {
      type: String,
    },
    drinkAlternate: {
      type: String,
      default: "Sorry, not specified",
    },
    tags: {
      type: String,
    },
    video: {
      type: String,
    },
    category: {
      type: String,
      enum: categoryTypes,
    },
    IBA: {
      type: String,
    },
    alcoholic: {
      type: String,
      enum: ["Alcoholic", "Non alcoholic"],
    },
    glass: {
      type: String,
      enum: glassTypes,
    },
    description: {
      type: String,
    },
    instructions: {
      type: String,
    },
    instructionsES: {
      type: String,
    },
    instructionsDE: {
      type: String,
    },
    instructionsFR: {
      type: String,
    },
    instructionsIT: {
      type: String,
    },
    instructionsRU: {
      type: String,
    },
    instructionsPL: {
      type: String,
    },
    instructionsUK: {
      type: String,
    },
    drinkThumb: {
      type: String,
    },
    ingredients: [
      {
        title: String,
        measure: String,
        ingredientId: Schema.Types.ObjectId,
      },
    ],
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    users: [
      {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
    ],
  },
  { versionKey: false, timestamps: true }
);

// recipeSchema.post("save", handleMongooseError);

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
  ingredients: Joi.object({
    title: Joi.string(),
    measure: Joi.string(),
  }),
  instructions: Joi.string(),
  owner: Joi.string(),
});

const schemas = {
  addDrinkSchema,
};

const Recipe = model("recipe", recipeSchema);

module.exports = {
  Recipe,
  schemas,
};
