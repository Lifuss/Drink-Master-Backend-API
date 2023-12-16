const Filters = require("../../models/filters");

const listGlasses = async (req, res) => {
  try {
    const glasses = await Filters.find({ glasses: { $exists: true } });
    res.json({
      glasses,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = listGlasses;
