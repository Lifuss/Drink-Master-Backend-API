const current = async (req, res, next) => {
  const { name, email, isAdult, avatarURL, token } = req.user;

  res.json({ name, email, isAdult, avatarURL, token });
};

module.exports = current;
