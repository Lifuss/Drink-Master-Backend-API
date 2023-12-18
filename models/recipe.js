const { model } = require("mongoose");

const recipeSchema = require("../schemas/mongooseSchema/recipe");

const Recipe = model("recipe", recipeSchema);

module.exports = {
  Recipe,
};
