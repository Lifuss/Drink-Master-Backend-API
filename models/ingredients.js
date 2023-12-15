const { model } = require("mongoose");
const ingredientSchema = require("../schemas/mongooseSchema/ingridients");

const Ingredient = model("ingredient", ingredientSchema);

module.exports = Ingredient;
