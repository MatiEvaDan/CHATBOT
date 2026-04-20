const express = require("express");
const router = express.Router();
const service = require("../Controllers/ServiceController.js");

router.post('/start', service.start);
router.post('/stop', service.stop);
router.get('/status', service.status);

module.exports = router;