const current = async (req, res, next) => {
  const { name, email, isAdult, avatarURL, token } = req.user;

  res.json({ token, user: { name, email, isAdult, avatarURL } });
};

module.exports = current;
