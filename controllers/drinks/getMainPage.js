const { Recipe } = require("../../models/recipe");

const getMainPage = async (req, res) => {
  const { page = 1, limit = 3 } = req.query;
  const skip = (page - 1) * limit;

  const { isAdult } = req.user;
  let filter = {};

  if (!isAdult) {
    filter = { alcoholic: "Non alcoholic" };
  }

  const categories = ["Ordinary Drink", "Cocktail", "Shake", "Other/Unknow"];
  const results = [];

  for (const category of categories) {
    const result = await Recipe.find({ ...filter, category })
      .sort({
        createdAt: -1,
      })
      .skip(skip)
      .limit(limit);

    results.push({ category, drinks: result });
  }

  res.json(results);
  // results => [{category: "", drinks: [{}, {}, {}]}, {category: "", drinks: [{}, {}, {}]}]
};

module.exports = getMainPage;
