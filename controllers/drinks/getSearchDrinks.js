const { Recipe } = require("../../models/recipe");

const { requestError } = require("../../services");

const getSearchDrinks = async (req, res) => {
  const { drink, category, ingredients, page = 1, limit = 12 } = req.query;
  const skip = (page - 1) * limit;

  const { isAdult } = req.user;
  const filter = {};

  if (!isAdult) {
    filter.alcoholic = "Non alcoholic";
  }

  if (drink) {
    filter.drink = { $regex: new RegExp(drink, "i") };
  }

  if (category) {
    filter.category = category;
  }

  if (ingredients) {
    const ingredientsArray = ingredients.split(",");
    filter["ingredients.title"] = { $in: ingredientsArray };
  }

  const result = await Recipe.find(filter, "-createdAt -updatedAt").populate(
    "owner",
    "name email"
  );

  if (result.length === 0) {
    throw requestError(404, "Not found");
  }

  res.json({
    result: result.splice(skip, limit),
    total: result.length + 1,
    pages: Math.ceil(result.length / limit + 1),
  });
};

module.exports = getSearchDrinks;
