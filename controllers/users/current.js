const current = async (req, res, next) => {
  const { name, isAdult, avatarURL, token } = req.user;

  res.json({ name, isAdult, avatarURL, token });
};

module.exports = current;
