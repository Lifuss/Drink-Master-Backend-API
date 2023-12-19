const Ingredients = require("../../models/ingredients");

const listIngredients = async (req, res) => {
  if (!req.user.isAdult) {
    const ingredients = await Ingredients.find({ alcohol: "No" });
    return res.json(ingredients);
  } else {
    const ingredients = await Ingredients.find();
    return res.json(ingredients);
  }
};

module.exports = listIngredients;
