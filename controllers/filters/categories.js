const Filters = require("../../models/filters");

const listCategories = async (req, res) => {
  try {
    const categories = await Filters.find({ categories: { $exists: true } });
    res.json({
      categories,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = listCategories;
