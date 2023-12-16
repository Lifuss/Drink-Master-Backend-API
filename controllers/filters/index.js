const { ctrlWrapper } = require("../../services");
const listIngredients = require("./listIngredients");

module.exports = {
  listIngredients: ctrlWrapper(listIngredients),
};
