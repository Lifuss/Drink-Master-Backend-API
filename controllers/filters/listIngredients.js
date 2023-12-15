const Ingredients = require("../../models/ingredients");

const listIngredients = async (req, res) => {
  try {
    const ingredients = await Ingredients.find();
    res.json({
      status: "success",
      code: 200,
      data: {
        ingredients,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = listIngredients;
