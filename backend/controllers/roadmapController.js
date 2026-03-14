const Roadmap = require('../models/Roadmap');

// @route  POST /api/roadmap/save
// @desc   Save or overwrite the authenticated user's roadmap
// @access Private
exports.saveRoadmap = async (req, res) => {
  try {
    const { data } = req.body;
    if (!data) return res.status(400).json({ success: false, message: 'Roadmap data is required.' });

    // Upsert: create if not exists, otherwise update
    const roadmap = await Roadmap.findOneAndUpdate(
      { userId: req.user.id },
      { userId: req.user.id, data },
      { upsert: true, new: true }
    );

    res.json({ success: true, roadmap });
  } catch (err) {
    console.error('saveRoadmap error:', err);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

// @route  GET /api/roadmap/my
// @desc   Fetch the authenticated user's roadmap
// @access Private
exports.getMyRoadmap = async (req, res) => {
  try {
    const roadmap = await Roadmap.findOne({ userId: req.user.id });
    if (!roadmap) {
      return res.status(404).json({ success: false, message: 'No roadmap found.' });
    }
    res.json({ success: true, roadmap });
  } catch (err) {
    console.error('getMyRoadmap error:', err);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

// @route  GET /api/roadmap/has
// @desc   Check if the authenticated user has a roadmap (lightweight – no data)
// @access Private
exports.hasRoadmap = async (req, res) => {
  try {
    const exists = await Roadmap.exists({ userId: req.user.id });
    res.json({ success: true, hasRoadmap: !!exists });
  } catch (err) {
    console.error('hasRoadmap error:', err);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};
