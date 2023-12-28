const express = require("express");
const authentication = require("../../middlewares/authentication");
const {
  current,
  updateInfo,
  subscribeEmail,
} = require("../../controllers/users");
const schema = require("../../schemas/JoiValidator");
const validateBody = require("../../middlewares/validateBody");
const upload = require("../../middlewares/upload");

const router = express.Router();

router.get("/current", authentication, current);
router.patch(
  "/update",
  authentication,
  upload.single("avatarThumb"),
  validateBody(schema.schemaUpdate),
  updateInfo
);

router.post("/subscribe", validateBody(schema.schemaSubscribe), subscribeEmail);

module.exports = router;
