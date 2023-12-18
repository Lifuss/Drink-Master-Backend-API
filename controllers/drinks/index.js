const { ctrlWrapper } = require("../../services");

const getPopularDrinks = require("./popular");
module.exports = {
  getPopularDrinks: ctrlWrapper(getPopularDrinks),
};
