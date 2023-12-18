const { Recipe } = require("../../models/recipe");
const { User } = require("../../models/user");
const { requestError, ctrlWrapper } = require("../../services");

const getFav = async (req, res) => {
  const { _id } = req.user;
  const data = await User.findOne({ _id }).populate("favorites");
  res.json(data.favorites);
};

const addFaV = async (req, res) => {
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
  res.json(updatedUser);
};

module.exports = {
  getFav: ctrlWrapper(getFav),
  addFaV: ctrlWrapper(addFaV),
  removeFav: ctrlWrapper(removeFav),
};
