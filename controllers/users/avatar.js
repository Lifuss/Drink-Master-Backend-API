const path = require("path");
const fs = require("fs");
const User = require("../../models/user");
const Jimp = require("jimp");

const avatarDir = path.join(__dirname, "../../", "public", "avatars");

const avatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;

  const avatarImage = await Jimp.read(tempUpload);
  avatarImage.resize(250, 250);

  const extension = originalname.split(".").pop();
  const filename = `${_id}.${extension}`;

  const resultUpload = path.join(avatarDir, filename);
  await avatarImage.writeAsync(resultUpload);

  fs.unlink(tempUpload, (err) => {
    if (err) throw err;
  });

  const avatarURL = path.join("avatars", filename);
  await User.findByIdAndUpdate(_id, { avatarURL });

  res.json({ avatarURL });
};

module.exports = avatar;
