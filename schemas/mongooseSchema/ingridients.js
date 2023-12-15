const { Schema } = require("mongoose");

const ingridientSchema = Schema({
  title: {
    type: String,
    required: [true, "Set ingridient title"],
  },
  ingredientThumb: {
    type: String,
    required: [true, "Set ingridient thumbnail"],
  },
  thumbMedium: {
    type: String,
    required: [true, "Set ingridient thumbnail"],
  },
  thumbSmall: {
    type: String,
    required: [true, "Set ingridient thumbnail"],
  },
  abv: {
    type: String,
    required: [true, "Set ingridient abv"],
  },
  alcohol: {
    type: String,
    required: [true, "Set ingridient alcohol"],
  },
  description: {
    type: String,
    required: [true, "Set ingridient description"],
  },
  type: {
    type: String,
    required: [true, "Set ingridient type"],
  },
  flavour: {
    type: String,
    required: [true, "Set ingridient flavour"],
  },
  country: {
    type: String,
    required: [true, "Set ingridient country"],
  },
});

module.exports = { ingridientSchema };
