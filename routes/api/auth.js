const express = require("express");
const validateBody = require("../../middlewares/validateBody");
const authentication = require("../../middlewares/authentication");
const { logout, singUp, signIn } = require("../../controllers/auth");
const upload = require("../../middlewares/upload");

const router = express.Router();
// dasdas

router.post("/signup", singUp);
router.post("/signin", signIn);
router.get("/logout", authentication, logout);

module.exports = router;
