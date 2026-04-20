const mongoose = require("mongoose");

const inventoryStatsSchema = new mongoose.Schema({
  count: {
    type: Number,
    required: true
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("InventoryStats", inventoryStatsSchema);