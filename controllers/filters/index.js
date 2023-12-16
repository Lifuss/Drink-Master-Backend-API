const { ctrlWrapper } = require("../../services");
const listIngredients = require("./listIngredients");
const listGlasses = require("./glasses");

module.exports = {
  listIngredients: ctrlWrapper(listIngredients),
  listGlasses: ctrlWrapper(listGlasses),
};
