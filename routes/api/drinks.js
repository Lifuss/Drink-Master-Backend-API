const express = require("express");
const validateBody = require("../../middlewares/validateBody");

const router = express.Router();

const ctrl = require("../../controllers/drinks/drinks");

router.get("/mainpage", ctrl.getAllDrinks);
router.get("/popular");
router.get("/:id", ctrl.getDrinkById);
router.get("/search");

router.get("/own");
router.post("/own/add");
router.delete("/own/remove");

router.get("/favorite");
router.post("/favorite/add");
router.delete("/favorite/remove");

module.exports = router;
