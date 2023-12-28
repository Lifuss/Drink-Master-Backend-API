const { User } = require("../../models/user");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { requestError } = require("../../services");
const { nanoid } = require("nanoid");
const moment = require("moment");

const register = async (req, res, next) => {
  const { name, email, password, date } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw requestError(409, "Email in use");
  }
  const hashPassword = await bcrypt.hash(password, 5);
  const avatarURL = gravatar.url(email);

  const verifyToken = nanoid();

  let isAdult = false;
  const eighteenYearsAgo = moment().subtract(18, "years");
  if (moment(date).isBefore(eighteenYearsAgo)) {
    isAdult = true;
  }

  const result = await User.create({
    name,
    email,
    password: hashPassword,
    avatarURL,
    verifyToken,
    date,
    isAdult,
  });

  res.status(201).json({
    user: {
      name: result.name,
      email: result.email,
      isAdult: result.isAdult,
    },
  });
};

module.exports = register;
