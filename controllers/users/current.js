const current = async (req, res, next) => {
  const { name, email, isAdult, avatarURL, token, favorites } = req.user;

  res.json({ name, email, isAdult, avatarURL, token, favorites: favorites });
};

module.exports = current;
