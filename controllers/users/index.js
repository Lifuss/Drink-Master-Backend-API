const { ctrlWrapper } = require("../../services");
const current = require("./current");
const updateAvatar = require("./avatar");

module.exports = {
  updateAvatar: ctrlWrapper(updateAvatar),
  current: ctrlWrapper(current),
};
