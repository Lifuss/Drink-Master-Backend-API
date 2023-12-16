const express = require("express");
const {
  getFav,
  addFaV,
  removeFav,
} = require("../../controllers/drinks/favorites");
const { getPopularDrinks } = require("../../controllers/drinks/index");
const validateBody = require("../../middlewares/validateBody");

const router = express.Router();

const ctrl = require("../../controllers/drinks/drinks");
const authentication = require("../../middlewares/authentication");

router.get("/mainpage", authentication, ctrl.getAllDrinks);
router.get("/popular", authentication, getPopularDrinks);
router.get("/search", authentication, ctrl.getSearchDrinks);

router.get("/own", authentication, ctrl.getOwnDrinks);
router.post("/own/add", authentication, ctrl.addOwnDrink);
router.delete("/own/remove/:id", authentication, ctrl.removeOwnDrink);

router.get("/favorite", authentication, getFav);
router.post("/favorite/add", authentication, addFaV);
router.delete("/favorite/remove", authentication, removeFav);

router.get("/:id", authentication, ctrl.getDrinkById);

module.exports = router;
