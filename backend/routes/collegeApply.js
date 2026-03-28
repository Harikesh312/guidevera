const express = require('express');
const router = express.Router();
const { applyToCollege } = require('../controllers/collegeApplyController');

router.post('/', applyToCollege);

module.exports = router;
