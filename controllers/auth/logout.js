const User = require("../../models/user");

const logout = async (req, res, next) => {
  await User.findByIdAndUpdate(req.user._id, { token: "" });
  res.status(204).json();
};

module.exports = logout;
