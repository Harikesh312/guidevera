const express = require('express');
const router = express.Router();
const leadsController = require('../controllers/leadsController');

router.post('/', leadsController.submitLead);

module.exports = router;
