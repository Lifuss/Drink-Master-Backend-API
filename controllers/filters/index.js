const { ctrlWrapper } = require("../../services");
const listIngredients = require("./listIngredients");
const listGlasses = require("./glasses");
const listCategories = require("./categories");

module.exports = {
  listIngredients: ctrlWrapper(listIngredients),
  listGlasses: ctrlWrapper(listGlasses),
  listCategories: ctrlWrapper(listCategories),
};
