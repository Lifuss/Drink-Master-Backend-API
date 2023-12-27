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
    // регулярний вираз для пошуку за частковою або неправильною назвою
    filter.drink = { $regex: new RegExp(drink, "i") };
  }

  if (category) {
    filter.category = category;
  }

  if (ingredients) {
    // ?ingredients=Prosecco,Campari => коктейлі, до яких входять Prosecco та/або Campari
    const ingredientsArray = ingredients.split(",");
    // пошук коктейлів, в яких значення поля ingredients.title збігається з будь-яким значенням з масиву ingredientsArray, хоча б з одним ($in)
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
