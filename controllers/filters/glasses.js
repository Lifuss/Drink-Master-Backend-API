const Filters = require("../../models/filters");

const listGlasses = async (req, res) => {
  const glasses = await Filters.find({ glasses: { $exists: true } }, "-_id");
  res.json(...glasses);
};

module.exports = listGlasses;
