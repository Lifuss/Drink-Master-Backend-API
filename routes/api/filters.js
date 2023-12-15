const express = require("express");
const authentication = require("../../middlewares/authentication");
const { listIngredients } = require("../../controllers/filters");

const router = express.Router();

router.get("/categories");
router.get("/ingredients", authentication, listIngredients);
router.get("/glasses");

module.exports = router;
