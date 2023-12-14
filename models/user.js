const { model } = require("mongoose");
const { userSchema } = require("../schemas/mongooseSchema");

const User = model("user", userSchema);

module.exports = User;
