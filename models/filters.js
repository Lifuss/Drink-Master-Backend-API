const { model } = require("mongoose");

const filterSchema = require("../schemas/mongooseSchema/filters");

const Filters = model("Filter", filterSchema);

module.exports = Filters;
