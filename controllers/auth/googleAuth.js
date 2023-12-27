const jwt = require("jsonwebtoken");
const { User } = require("../../models/user");
const { FRONTEND_URL } = process.env;

const googleAuth = async (req, res) => {
  const { _id: id } = req.user;
  const payload = {
    id,
  };

  const token = jwt.sign(payload, process.env.SECRET_KEY, {
    expiresIn: "24h",
  });

  await User.findByIdAndUpdate(id, { token });

  res.redirect(`${FRONTEND_URL}?token=${token}`);
};

module.exports = googleAuth;
