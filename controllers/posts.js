const asyncHandler = require('../middleware/asyncHandler');
// const User = require('../models/User');

// @desc    Get all users
// @route   GET /api/v1/users
// @access  Private/Admin
exports.getPosts = asyncHandler(async (req, res, next) => {
  res.status(200).json("Get posts");
});