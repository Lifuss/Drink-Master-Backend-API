const { Schema } = require("mongoose");

const { handleMongooseError } = require("../../services");

const { categoryTypes, glassTypes } = require("../../services/constants");

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
        ingredientId: {
          type: Schema.Types.ObjectId,
          ref: "ingredients",
        },
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

recipeSchema.post("save", handleMongooseError);

module.exports = {
  recipeSchema,
};
