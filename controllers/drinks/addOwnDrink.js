const cloudinary = require("../../services/cloudinary");
const { Recipe } = require("../../models/recipe");
const fs = require("fs/promises");

const addOwnDrink = async (req, res) => {
  const { _id: owner, isAdult } = req.user;

  if (!isAdult && req.body.alcoholic === "Alcoholic") {
    return res.status(400).json({
      message: "Non-adult cannot add alcoholic drinks",
    });
  }

  let drinkThumb =
    "https://res.cloudinary.com/djpikgsv1/image/upload/v1702944415/OwnDrinksImages/defaultDrinkImage_lbvskn.png";

  if (req.file) {
    const { path: oldPath } = req.file;

    const uploadResult = await cloudinary.uploader.upload(oldPath, {
      folder: "OwnDrinksImages",
      transformation: [{ width: 400, height: 400, crop: "fill" }],
    });

    drinkThumb = uploadResult.secure_url;

    await fs.unlink(oldPath);
  }

  const result = await Recipe.create({ ...req.body, owner, drinkThumb });

  res.status(201).json(result);
};

module.exports = addOwnDrink;
