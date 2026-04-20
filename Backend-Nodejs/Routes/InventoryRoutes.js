const express = require("express");
const router = express.Router();
const inventoryController = require("../Controllers/InventoryController");

router.get('/', inventoryController.getInventory);

module.exports = router;