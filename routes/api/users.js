const express = require("express");
const authentication = require("../../middlewares/authentication");
const { current } = require("../../controllers/users");

const router = express.Router();

router.get("/current", authentication, current);
router.patch("/update");

router.post("/subscribe");

module.exports = router;
