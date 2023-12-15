const { model } = require("mongoose");
const ingredientSchema = require("../schemas/mongooseSchema/ingridients");

const Ingredients = model("Ingredient", ingredientSchema);

module.exports = Ingredients;
