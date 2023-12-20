const { User } = require("../../../models/user");

const getFav = async (req, res) => {
  const { _id } = req.user;
  const data = await User.findOne({ _id }).populate("favorites");
  res.json(data.favorites);
};

module.exports = getFav;
