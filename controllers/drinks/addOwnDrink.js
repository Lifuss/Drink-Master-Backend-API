const { Recipe } = require("../../models/recipe");

const addOwnDrink = async (req, res) => {
  const { _id: owner, isAdult } = req.user;

  if (!isAdult && req.body.alcoholic === "Alcoholic") {
    return res.status(400).json({
      message: "Non-adult cannot add alcoholic drinks",
    });
  }
  const result = await Recipe.create({ ...req.body, owner });
  console.log(result);
  console.log(req.body);
  res.status(201).json(result);
};

module.exports = addOwnDrink;

//6580160cf3b507fe76000198
