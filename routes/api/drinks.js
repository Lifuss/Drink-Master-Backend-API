const express = require("express");
const { getPopularDrinks } = require("../../controllers/drinks/index");
const validateBody = require("../../middlewares/validateBody");
const schema = require("../../schemas/JoiValidator");
const upload = require("../../middlewares/upload");

const router = express.Router();

const fav = require("../../controllers/drinks/favorite/index");
const ctrl = require("../../controllers/drinks");

const authentication = require("../../middlewares/authentication");
const { addDrinkSchema } = require("../../schemas/JoiValidator");

router.get("/mainpage", authentication, ctrl.getMainPage);
router.get("/popular", authentication, getPopularDrinks);
router.get("/search", authentication, ctrl.getSearchDrinks);

router.get("/own", authentication, ctrl.getOwnDrinks);
router.post(
  "/own/add",
  authentication,
  upload.fields([
    { name: "drink" },
    { name: "description" },
    { name: "category" },
    { name: "glass" },
    { name: "alcoholic" },
    { name: "ingredients" },
    { name: "instructions" },
    { name: "drinkImage" },
  ]),
  validateBody(addDrinkSchema),
  ctrl.addOwnDrink
);
router.delete("/own/remove/:id", authentication, ctrl.removeOwnDrink);

router.get("/favorite", authentication, fav.getFav);
router.post(
  "/favorite/add",
  authentication,
  validateBody(schema.schemaFavoriteId),
  fav.addFav
);
router.delete(
  "/favorite/remove",
  authentication,
  validateBody(schema.schemaFavoriteId),
  fav.removeFav
);

router.get("/:id", authentication, ctrl.getDrinkById);

module.exports = router;
