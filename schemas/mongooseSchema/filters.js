const { Schema } = require("mongoose");

const filterSchema = Schema({
  glasses: {
    type: String,
    required: true,
  },
  categories: {
    type: String,
    required: true,
  },
});

module.exports = { filterSchema };
