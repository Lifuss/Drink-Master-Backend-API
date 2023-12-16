const { Recipe } = require("../../models/recipe");

const { ctrlWrapper, requestError } = require("../../services");

const getAllDrinks = async (req, res) => {
  const { page = 1, limit = 12 } = req.query;
  const skip = (page - 1) * limit;

  const { isAdult } = req.user;
  let filter = {};

  if (!isAdult) {
    filter = { alcoholic: "Non alcoholic" };
  }

  const result = await Recipe.find(filter, "-createdAt -updatedAt", {
    skip,
    limit,
  }).populate("owner", "name email");
  res.json(result);
};

const getDrinkById = async (req, res) => {
  const { id } = req.params;
  const { isAdult } = req.user;

  const result = await Recipe.findById(id).populate("owner", "name email");

  if (!result || (!isAdult && result.alcoholic === "Alcoholic")) {
    throw requestError(404, "Not found");
  }
  res.status(200).json(result);
};

const getOwnDrinks = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 12 } = req.query;
  const skip = (page - 1) * limit;
  const filter = { owner };
  const result = await Recipe.find(filter, "-createdAt -updatedAt", {
    skip,
    limit,
  }).populate("owner", "name email");
  res.json(result);
};

const addOwnDrink = async (req, res) => {
  const { _id: owner, isAdult } = req.user;

  if (!isAdult && req.body.alcoholic === "Alcoholic") {
    return res.status(400).json({
      message: "Non-adult cannot add alcoholic drinks",
    });
  }
  const result = await Recipe.create({ ...req.body, owner });
  res.status(201).json(result);
};

const removeOwnDrink = async (req, res) => {
  const { id } = req.params;
  const { _id: currentUser } = req.user;

  const drinkToDelete = await Recipe.findOne({ _id: id });

  if (!drinkToDelete) {
    throw requestError(404, "Not found");
  }

  if (drinkToDelete.owner.toString() !== currentUser.toString()) {
    return res.status(403).json({
      message: "You are not allowed to delete this drink",
    });
  }

  await Recipe.findByIdAndDelete(id);

  res.status(200).json({
    message: "Drink deleted successfully",
  });
};

module.exports = {
  getAllDrinks: ctrlWrapper(getAllDrinks),
  getDrinkById: ctrlWrapper(getDrinkById),
  getOwnDrinks: ctrlWrapper(getOwnDrinks),
  addOwnDrink: ctrlWrapper(addOwnDrink),
  removeOwnDrink: ctrlWrapper(removeOwnDrink),
};
