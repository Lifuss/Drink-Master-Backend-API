const { Recipe } = require("../../../models/recipe");
const User = require("../../../models/user");
const { requestError } = require("../../../services");

const addFav = async (req, res) => {
  const { _id } = req.user;
  const cocktailId = req.body.cocktailId;
  const cocktail = await Recipe.findById(cocktailId);

  if (!cocktail) {
    throw requestError(404, "Wrong ID");
  }
  const updatedUser = await User.findByIdAndUpdate(
    _id,
    { $addToSet: { favorites: cocktailId } },
    { new: true }
  );

  await Recipe.findByIdAndUpdate(
    cocktailId,
    {
      $addToSet: { users: _id },
    },
    { new: true }
  );
  res.json(updatedUser);
};

module.exports = addFav;
