const { Schema } = require("mongoose");

const glassSchema = Schema({
  glasses: {
    type: String,
    required: true,
  },
});

module.exports = { glassSchema };
