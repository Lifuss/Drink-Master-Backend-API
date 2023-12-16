const express = require("express");
// const validateBody = require("../../middlewares/validateBody");
const getPopularDrinks = require("../../controllers/drinks/popular");

const router = express.Router();

const ctrl = require("../../controllers/drinks/drinks");
const authentication = require("../../middlewares/authentication");

router.get("/mainpage", authentication, ctrl.getAllDrinks);
router.get("/popular", authentication, getPopularDrinks);
router.get("/search", authentication, ctrl.getSearchDrinks);

router.get("/own", authentication, ctrl.getOwnDrinks);
router.post("/own/add", authentication, ctrl.addOwnDrink);
router.delete("/own/remove/:id", authentication, ctrl.removeOwnDrink);

router.get("/:id", authentication, ctrl.getDrinkById);

router.get("/favorite");
router.post("/favorite/add");
router.delete("/favorite/remove");

module.exports = router;
