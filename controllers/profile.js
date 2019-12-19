const asyncHandler = require('../middleware/asyncHandler');
const Profile = require('../models/Profile');
const ErrorResponse = require('../utils/ErrorResponse');

// @desc    Get current logged in user
// @route   GET /api/v1/profile/me
// @access  Private
exports.getCurrentProfile = asyncHandler(async (req, res, next) => {
  const profile = await Profile.findById(req.user.id).populate('user', [
    'name',
    'avatar'
  ]);

  if (!profile) {
    return next(new ErrorResponse('There is no profile for this user', 400));
  }

  res.status(200).json({ success: true, data: profile });
});

// @desc    Get the profile for a specific user
// @route   GET /api/v1/profile/:id
// @access  Public
exports.getProfile = asyncHandler(async (req, res, next) => {
  const profile = await Profile.findById(req.params.id).populate({
    path: 'bootcamp',
    select: 'name avatar'
  });

  if (!profile) {
    return next(new ErrorResponse(`Profile not found with id of ${req.params.id}`, 404));
  }

  res.status(200).json({
    success: true,
    data: profile
  });
});

// @desc    Create profile for user
// @route   POST /api/v1/profile
// @access  Private
exports.createProfile = asyncHandler(async (req, res, next) => {
  const existingProfile = await Profile.findOne({ user: req.user.id });
  if (existingProfile) {
    return next(new ErrorResponse('There is already a profile for this user', 400));
  }

  req.body.user = req.user.id;
  const profile = await Profile.create(req.body);

  res.status(200).json({ success: true, data: profile });
});

// @desc    Update profile
// @route   PUT /api/v1/profile
// @access  Private
exports.updateProfile = asyncHandler(async (req, res, next) => {
  // Prevent changing the user ID
  if (req.body.user) {
    delete req.body.user;
  }

  let profile = await Profile.findOne({ user: req.user.id });
  if (!profile) {
    return next(new ErrorResponse('There is no profile for this user', 400));
  }

  profile = await Profile.findOneAndUpdate({ user: req.user.id }, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({ success: true, data: profile });
});
