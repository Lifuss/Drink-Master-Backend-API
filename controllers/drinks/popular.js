const { Recipe } = require("../../models/recipe");

const getPopularDrinks = async (req, res) => {
  const { isAdult } = req.user;

  let filter = {};

  if (!isAdult) {
    filter = { alcoholic: "Non alcoholic" };
  }

  const result = await Recipe.aggregate([
    { $match: filter },
    { $addFields: { numFavorites: { $size: "$users" } } },
    { $sort: { numFavorites: -1 } },
    { $limit: 10 },
    {
      $lookup: {
        from: "users",
        localField: "owner",
        foreignField: "_id",
        as: "owner",
      },
    },
    { $unwind: "$owner" },
    { $project: { "owner.password": 0 } },
  ]);

  res.json(result);
};

module.exports = getPopularDrinks;
