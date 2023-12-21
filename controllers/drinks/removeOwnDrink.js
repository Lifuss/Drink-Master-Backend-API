const { Recipe } = require("../../models/recipe");
const { requestError } = require("../../services");
const cloudinary = require("../../services/cloudinary");
const getPublicId = require("../../services/getPublicId");

const removeOwnDrink = async (req, res) => {
  const { id } = req.params;
  const { _id: currentUser } = req.user;

  const drinkToDelete = await Recipe.findOne({ _id: id });

  if (!drinkToDelete) {
    throw requestError(404, "Not found");
  }

  if (drinkToDelete.owner.toString() !== currentUser.toString()) {
    return res.status(403).json({
      message: "You are not allowed to delete this drink",
    });
  }

  if (drinkToDelete.drinkThumb) {
    try {
      const publicId = getPublicId(drinkToDelete.drinkThumb);
      await cloudinary.uploader.destroy(publicId);
    } catch (error) {
      console.error("Error deleting image from Cloudinary:", error);
    }
  }

  await Recipe.findByIdAndDelete(id);

  res.status(204).end();
};

module.exports = removeOwnDrink;
