const { Recipe } = require("../../models/recipe");

const { requestError } = require("../../services");

const getDrinkById = async (req, res) => {
  const { id } = req.params;
  const { isAdult } = req.user;

  const result = await Recipe.findById(id);

  if (!result || (!isAdult && result.alcoholic === "Alcoholic")) {
    throw requestError(404, "Not found");
  }
  res.status(200).json(result);
};

module.exports = getDrinkById;
