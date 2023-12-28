const express = require("express");
const validateBody = require("../../middlewares/validateBody");
const schema = require("../../schemas/JoiValidator");
const authentication = require("../../middlewares/authentication");
const {
  logout,
  singUp,
  signIn,
  googleAuth,
} = require("../../controllers/auth");
const passport = require("../../middlewares/google-authenticate");

const router = express.Router();

// google
router.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  googleAuth
);

router.post("/signup", validateBody(schema.schemaRegister), singUp);
router.post("/signin", validateBody(schema.schemaLogin), signIn);
router.post("/signout", authentication, logout);

module.exports = router;
