const { Recipe } = require("../../models/recipe");

const getOwnDrinks = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 12 } = req.query;
  const skip = (page - 1) * limit;
  const filter = { owner };
  const result = await Recipe.find(filter, "-createdAt -updatedAt", {
    skip,
    limit,
  }).populate("owner", "name email");
  res.json({
    cocktails: result.splice(skip, limit),
    total: result.length + 1,
    pages: Math.ceil(result.length / limit + 1),
  });
};

module.exports = getOwnDrinks;
