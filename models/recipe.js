const { model } = require("mongoose");

const { recipeSchema } = require("../schemas/mongooseSchema/users");

const Recipe = model("recipe", recipeSchema);
