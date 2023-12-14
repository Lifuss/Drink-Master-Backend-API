const User = require("../../models/user");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { requestError } = require("../../services");

const register = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw requestError(409, "Email in use");
  }
  const hashPassword = await bcrypt.hash(password, 5);
  const avatarURL = gravatar.url(email);
  const result = await User.create({
    email,
    password: hashPassword,
    avatarURL,
  });

  res
    .status(201)
    .json({
      user: {
        email: result.email,
        subscription: result.subscription,
        avatar: result.avatarURL,
      },
    });
};

module.exports = register;
