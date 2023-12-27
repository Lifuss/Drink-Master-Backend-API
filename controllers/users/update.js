const { User } = require("../../models/user");
const cloudinary = require("../../services/cloudinary");
const fs = require("fs/promises");

const update = async (req, res, next) => {
  const { _id } = req.user;
  const { name } = req.body;

  let avatarThumb = req.user.avatarURL;

  try {
    if (req.file) {
      const { path: oldPath } = req.file;

      if (!req.user.avatarURL.includes("gravatar")) {
        const oldAvatarPublicId = req.user.avatarURL;
        const startsWith = oldAvatarPublicId.indexOf("userAvatars/");
        const publicIdWithExpansion = oldAvatarPublicId.slice(startsWith);
        const lastDotIndex = publicIdWithExpansion.lastIndexOf(".");
        const publicId = publicIdWithExpansion.slice(0, lastDotIndex);

        await cloudinary.uploader.destroy(publicId);
      }

      const upload = await cloudinary.uploader.upload(oldPath, {
        folder: "userAvatars",
        transformation: [{ width: 400, height: 400, crop: "fill" }],
      });
      const newAvatarUrl = upload.secure_url;
      avatarThumb = newAvatarUrl;
      await fs.unlink(oldPath);
    }
  } catch (error) {
    console.error("Error:", error);
  }

  const user = await User.findByIdAndUpdate(
    _id,
    { name, avatarURL: avatarThumb },
    { new: true }
  );

  res.json({
    user: user.name,
    avatarURL: avatarThumb,
  });
};

module.exports = update;
