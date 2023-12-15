const { Recipe } = require("../../models/recipe");

const { ctrlWrapper, requestError } = require("../../services");

const getAllDrinks = async (req, res) => {
  const result = await Recipe.find({}, "-createdAt -updatedAt");
  res.json(result);
};

const getDrinkById = async (req, res) => {
  const { id } = req.params;
  const result = await Recipe.findById(id);
  if (!result) {
    throw requestError(404, "Not found");
  }
  res.status(200).json(result);
};

module.exports = {
  getAllDrinks: ctrlWrapper(getAllDrinks),
  getDrinkById: ctrlWrapper(getDrinkById),
};
