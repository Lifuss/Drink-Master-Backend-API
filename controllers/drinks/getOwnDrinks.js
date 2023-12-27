const { Recipe } = require("../../models/recipe");

const getOwnDrinks = async (req, res) => {
  const { _id: owner } = req.user;

  const { page = 1, limit = 9 } = req.query;
  const skip = (page - 1) * limit;

  const filter = { owner };
  const result = await Recipe.find(filter, "-createdAt -updatedAt").populate(
    "owner",
    "name email"
  );

  const total = result.length;
  const pages = Math.ceil(result.length / limit);

  res.json({
    cocktails: result.splice(skip, limit),
    total,
    pages,
  });
};

module.exports = getOwnDrinks;
