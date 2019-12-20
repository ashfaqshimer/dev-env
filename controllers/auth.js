const asyncHandler = require('../middleware/asyncHandler');
const User = require('../models/User');
const ErrorResponse = require('../utils/ErrorResponse');

// @desc    Create a user
// @route   POST /api/v1/auth/register
// @access  Private/Admin
exports.createUser = asyncHandler(async (req, res, next) => {
  const user = await User.create(req.body);
  // Hide the password
  user.password = undefined;
  
  const token = user.getSignedJwtToken();
  res.status(201).json({ success: true, data: user, token });
});

// @desc    Create a user
// @route   POST /api/v1/auth/login
// @access  Private/Admin
exports.loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  // Validating email and password
  if (!email || !password) {
    return next(new ErrorResponse('Please provide an email and password', 400));
  }
  // Check for user
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }
  // Check if password matches
  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  const token = user.getSignedJwtToken();
  res.status(201).json({ success: true, token });
});

// @desc    Get current logged in user
// @route   GET /api/v1/auth/me
// @access  Private
exports.getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({ success: true, data: user });
});
