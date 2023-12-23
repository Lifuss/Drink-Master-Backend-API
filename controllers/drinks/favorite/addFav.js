const { Recipe } = require("../../../models/recipe");
const { User } = require("../../../models/user");
const { requestError } = require("../../../services");

const addFav = async (req, res) => {
  const { _id } = req.user;
  const cocktailId = req.body.cocktailId;
  const cocktail = await Recipe.findById(cocktailId);

  if (!cocktail) {
    throw requestError(404, "Wrong ID");
  }

  await User.findByIdAndUpdate(
    _id,
    { $addToSet: { favorites: cocktailId } },
    { new: true }
  );

  const updatedUser = await User.findById(_id);

  const sendFirstFavGreeting =
    updatedUser.favorites.length === 1 && updatedUser.firstFavDrink === false;

  const sendTenthFavGreeting =
    updatedUser.favorites.length === 10 && updatedUser.tenthFavDrink === false;

  if (sendTenthFavGreeting) {
    await User.findByIdAndUpdate(_id, { tenthFavDrink: true });
  }

  if (sendFirstFavGreeting) {
    await User.findByIdAndUpdate(_id, { firstFavDrink: true });
  }

  const drink = await Recipe.findByIdAndUpdate(
    cocktailId,
    {
      $addToSet: { users: _id },
    },
    { new: true }
  );

  res.json({ drink, sendFirstFavGreeting, sendTenthFavGreeting });
};

module.exports = addFav;
