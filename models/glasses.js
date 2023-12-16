const { model } = require("mongoose");

const glassSchema = require("../schemas/mongooseSchema/glasses");

const Glasses = model("Glass", glassSchema);

module.exports = Glasses;
