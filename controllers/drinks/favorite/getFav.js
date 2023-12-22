const { User } = require("../../../models/user");

const getFav = async (req, res) => {
  const { page = 1, limit = 9 } = req.query;
  const skip = (page - 1) * limit;

  const { _id } = req.user;
  const data = await User.findOne({ _id }, "favorites").populate(
    "favorites",
    "-instructionsES -instructionsDE -instructionsFR -instructionsIT -instructionsRU -instructionsPL"
  );

  res.json({
    favorites: data.favorites.splice(skip, limit),
    total: data.favorites.length + 1,
    pages: Math.ceil(data.favorites.length / limit + 1),
  });
};

module.exports = getFav;
