const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { saveRoadmap, getMyRoadmap, hasRoadmap } = require('../controllers/roadmapController');

router.post('/save', auth, saveRoadmap);
router.get('/my', auth, getMyRoadmap);
router.get('/has', auth, hasRoadmap);

module.exports = router;
