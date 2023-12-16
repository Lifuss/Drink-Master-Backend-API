const express = require("express");
const validateBody = require("../../middlewares/validateBody");

const router = express.Router();

const ctrl = require("../../controllers/drinks/drinks");
const authentication = require("../../middlewares/authentication");

router.get("/mainpage", authentication, ctrl.getAllDrinks);
router.get("/popular");
router.get("/:id", authentication, ctrl.getDrinkById);
router.get("/search");

router.get("/own");
router.post("/own/add", authentication, ctrl.addOwnDrink);
router.delete("/own/remove/:id", authentication, ctrl.removeOwnDrink);

router.get("/favorite");
router.post("/favorite/add");
router.delete("/favorite/remove");

module.exports = router;
