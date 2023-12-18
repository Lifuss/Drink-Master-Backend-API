const { ctrlWrapper } = require("../../services");
const current = require("./current");
const updateInfo = require("./update");
const updateAvatar = require("./avatar");
const subscribeEmail = require("./subscribeEmail");

module.exports = {
  updateAvatar: ctrlWrapper(updateAvatar),
  current: ctrlWrapper(current),
  updateInfo: ctrlWrapper(updateInfo),
  subscribeEmail: ctrlWrapper(subscribeEmail),
};
