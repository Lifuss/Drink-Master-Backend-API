const { User } = require("../../models/user");
const { requestError } = require("../../services");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { updateVisitCount } = require("../../services");

const login = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw requestError(401, "Email or password is wrong");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);

  if (!passwordCompare) {
    throw requestError(401, "Email or password wrong");
  }

  const payload = { id: user._id };
  const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "24h" });

  const userData = await User.findByIdAndUpdate(
    user._id,
    { token },
    { new: true }
  );

  const dayCount = await updateVisitCount(userData);

  res.json({
    token,
    user: { name: user.name, avatarURL: user.avatarURL, isAdult: user.isAdult },
    dayCount,
  });
};

module.exports = login;
