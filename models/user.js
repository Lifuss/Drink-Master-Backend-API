const { model } = require("mongoose");
const { userSchema } = require("../schemas/mongooseSchema/users");
const { schemaSubscribe } = require("../schemas/JoiValidator");

const User = model("user", userSchema);
const schemas = {
  schemaSubscribe,
};

module.exports = {
  User,
  schemas,
};
