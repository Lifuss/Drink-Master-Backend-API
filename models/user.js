const { model } = require("mongoose");
const { userSchema } = require("../schemas/mongooseSchema/users");

const User = model("user", userSchema);

module.exports = User;
