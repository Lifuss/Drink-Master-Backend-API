const express = require("express");
const authentication = require("../../middlewares/authentication");
const { current, updateInfo } = require("../../controllers/users");
const schema = require("../../schemas/JoiValidator");
const validateBody = require("../../middlewares/validateBody");

const router = express.Router();

router.get("/current", authentication, current);
router.patch(
  "/update",
  authentication,
  validateBody(schema.schemaUpdate),
  updateInfo
);

router.post("/subscribe");

module.exports = router;
