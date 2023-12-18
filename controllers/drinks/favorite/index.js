const { ctrlWrapper } = require("../../../services/index");
const getFav = require("./getFav");
const addFav = require("./addFav");
const removeFav = require("./removeFav");

module.exports = {
  getFav: ctrlWrapper(getFav),
  addFav: ctrlWrapper(addFav),
  removeFav: ctrlWrapper(removeFav),
};
