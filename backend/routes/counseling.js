const express = require('express');
const router = express.Router();
const { bookCounseling } = require('../controllers/counselingController');

router.post('/book', bookCounseling);

module.exports = router;
