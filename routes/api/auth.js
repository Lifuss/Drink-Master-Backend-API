const express = require("express");
const validateBody = require("../../middlewares/validateBody");
const schema = require("../../schemas/JoiValidator");
const authentication = require("../../middlewares/authentication");
const { logout, singUp, signIn } = require("../../controllers/auth");
// const upload = require("../../middlewares/upload");

const router = express.Router();

router.post("/signup", validateBody(schema.schemaRegister), singUp);
router.post("/signin", validateBody(schema.schemaLogin), signIn);
router.get("/logout", authentication, logout);

module.exports = router;
