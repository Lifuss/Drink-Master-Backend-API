const { Recipe } = require("../../models/recipe");

const getMainPage = async (req, res) => {
  const { page = 1, limit = 3 } = req.query;
  const skip = (page - 1) * limit;

  const { isAdult } = req.user;
  let filter = {};

  if (!isAdult) {
    filter = { alcoholic: "Non alcoholic" };
  }

  const drinks = {
    "Ordinary Drink": [],
    Cocktail: [],
    Shake: [],
    "Other/Unknown": [],
  };

  for (const category of Object.keys(drinks)) {
    const result = await Recipe.find(
      { ...filter, category },
      "-instructionsES -instructionsDE -instructionsFR -instructionsIT  -instructionsPL -instructionsRU -instructionsUK"
    )
      .populate("owner", "name owner")
      .sort({
        createdAt: -1,
      })
      .skip(skip)
      .limit(limit);

    drinks[category] = result;
  }

  res.json(drinks);
};

module.exports = getMainPage;
