const express = require("express");
const authentication = require("../../middlewares/authentication");
const { listIngredients } = require("../../controllers/filters");
const { listGlasses } = require("../../controllers/filters");
const { listCategories } = require("../../controllers/filters");

const router = express.Router();

router.get("/categories", authentication, listCategories);
router.get("/ingredients", authentication, listIngredients);
router.get("/glasses", authentication, listGlasses);

module.exports = router;
