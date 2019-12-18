const asyncHandler = require('../middleware/asyncHandler');
// const User = require('../models/User');

// @desc    Get all profiles
// @route   GET /api/v1/profiles
// @access  Private/Admin
exports.getProfile = asyncHandler(async (req, res, next) => {
  res.status(200).json("Get profile called");
});