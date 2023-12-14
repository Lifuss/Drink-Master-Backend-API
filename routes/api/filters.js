const express = require("express");

const router = express.Router();

router.get("/categories");
router.get("/ingredients");
router.get("/glasses");

module.exports = router;
