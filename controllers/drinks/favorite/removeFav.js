const { Recipe } = require("../../../models/recipe");
const { User } = require("../../../models/user");
const { requestError } = require("../../../services");

const removeFav = async (req, res) => {
  const { _id } = req.user;
  const cocktailId = req.body.cocktailId;
  const cocktail = await Recipe.findById(cocktailId);

  if (!cocktail) {
    throw requestError(404, "Wrong ID");
  }
  const updatedUser = await User.findByIdAndUpdate(
    _id,
    { $pull: { favorites: cocktailId } },
    { new: true }
  );

  await Recipe.findByIdAndUpdate(
    cocktailId,
    {
      $pull: { users: _id },
    },
    { new: true }
  );
  res.status(204).end();
};

module.exports = removeFav;
