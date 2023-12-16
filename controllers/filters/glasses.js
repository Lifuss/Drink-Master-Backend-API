const Glasses = require("../../models/glasses");

const listGlasses = async (req, res) => {
  try {
    const glasses = await Glasses.find();
    res.json({
      glasses,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = listGlasses;
