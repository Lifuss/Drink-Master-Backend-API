const { Recipe } = require("../../models/recipe");

const getPopularDrinks = async (req, res) => {
  const { isAdult } = req.user;

  let filter = {};

  if (!isAdult) {
    filter = { alcoholic: "Non alcoholic" };
  }

  const result = await Recipe.aggregate([
    { $match: filter },
    {
      $addFields: {
        numFavorites: {
          $cond: {
            if: { $isArray: "$users" },
            then: { $size: "$users" },
            else: 0,
          },
        },
      },
    },
    { $sort: { numFavorites: -1 } },
    { $limit: 4 },
  ]);

  res.json(result);
};

module.exports = getPopularDrinks;
