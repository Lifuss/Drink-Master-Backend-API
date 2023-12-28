const { User } = require("../../models/user");

const logout = async (req, res, next) => {
  await User.findByIdAndUpdate(req.user._id, { token: "" });
  res.status(200).end();
};

module.exports = logout;
