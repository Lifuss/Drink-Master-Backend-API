const Filters = require("../../models/filters");

const listCategories = async (req, res) => {
  const categories = await Filters.find(
    { categories: { $exists: true } },
    "-_id"
  );
  res.json(...categories);
};

module.exports = listCategories;
