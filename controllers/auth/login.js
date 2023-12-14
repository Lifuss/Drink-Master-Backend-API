const User = require("../../models/user");
const { requestError } = require("../../services");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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

  await User.findByIdAndUpdate(user._id, { token });

  res.json({
    token,
    user: { email: user.email, subscription: user.subscription },
  });
};

module.exports = login;
