const InventoryStats = require ("../Models/InventoryStats.js")

exports.getInventory = async (req, res) => {
  try {
    const stats = await InventoryStats
      .findOne()
     

    if (!stats) {
      return res.status(404).json({
        success: false,
        message: "No inventory stats found"
      });
    }

    res.json({
      success: true,
      data: stats
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};