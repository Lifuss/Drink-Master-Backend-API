const { ctrlWrapper } = require("../../services");

const getMainPage = require("./getMainPage");
const getDrinkById = require("./getDrinkById");
const getSearchDrinks = require("./getSearchDrinks");
const getOwnDrinks = require("./getOwnDrinks");
const addOwnDrink = require("./addOwnDrink");
const removeOwnDrink = require("./removeOwnDrink");
const getPopularDrinks = require("./popular");
module.exports = {
  getMainPage: ctrlWrapper(getMainPage),
  getDrinkById: ctrlWrapper(getDrinkById),
  getSearchDrinks: ctrlWrapper(getSearchDrinks),
  getOwnDrinks: ctrlWrapper(getOwnDrinks),
  addOwnDrink: ctrlWrapper(addOwnDrink),
  removeOwnDrink: ctrlWrapper(removeOwnDrink),
  getPopularDrinks: ctrlWrapper(getPopularDrinks),
};
