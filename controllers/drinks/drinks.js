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

module.exports = {
  getAllDrinks: ctrlWrapper(getAllDrinks),
  getDrinkById: ctrlWrapper(getDrinkById),
  addOwnDrink: ctrlWrapper(addOwnDrink),
};
