const { User } = require("../../models/user");
const bcrypt = require("bcryptjs");
const moment = require("moment");
const { requestError } = require("../../services");
const cloudinary = require("../../services/cloudinary");
const fs = require("fs/promises");

const update = async (req, res, next) => {
  const { _id } = req.user;
  const { name, email, date, password } = req.body;

  const userEmail = await User.findOne({ email });
  if (userEmail) {
    throw requestError(409, "Email in use");
  }

  if (password) {
    const hashPassword = await bcrypt.hash(password, 5);
    await User.findByIdAndUpdate(
      _id,
      { password: hashPassword },
      { new: true }
    );
  }

  let isAdult = false;
  const eighteenYearsAgo = moment().subtract(18, "years");
  if (moment(date).isBefore(eighteenYearsAgo)) {
    isAdult = true;
  }

  let avatarThumb = req.user.avatarUrl;

  if (req.file) {
    const { path: oldPath } = req.file;

    const { url: newAvatarUrl } = await cloudinary.uploader.upload(oldPath, {
      folder: "userAvatars",
      transformation: [{ width: 400, height: 400, crop: "fill" }],
    });

    avatarThumb = newAvatarUrl;

    await fs.unlink(oldPath);
  }

  const user = await User.findByIdAndUpdate(
    _id,
    { name, email, date, isAdult, avatarURL: avatarThumb },
    { new: true }
  );

  res.json({
    user: user.name,
    email: user.email,
    date: user.date,
    avatarURL: avatarThumb,
  });
};

module.exports = update;
