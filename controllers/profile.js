const asyncHandler = require('../middleware/asyncHandler');
const Profile = require('../models/Profile');
const ErrorResponse = require('../utils/ErrorResponse');
const request = require('request');

// @desc    Get current logged in user
// @route   GET /api/v1/profile/me
// @access  Private
exports.getCurrentProfile = asyncHandler(async (req, res, next) => {
  const profile = await Profile.findOne({ user: req.user.id }).populate('user', [
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
    path: 'user',
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

// @desc    Get all profiles
// @route   GET /api/v1/profile
// @access  Public
exports.getProfiles = asyncHandler(async (req, res, next) => {
  const profiles = await Profile.find().populate({
    path: 'user',
    select: 'name avatar'
  });

  res.status(200).json({ success: true, count: profiles.length, data: profiles });
});

// @desc    Get user repos from Github
// @route   GET /api/v1/profile/github/:username
// @access  Public
exports.getGithubProfiles = asyncHandler(async (req, res, next) => {
  const options = {
    uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${process.env.GITHUB_CLIENT_ID}&client_secret=${process.env.GITHUB_CLIENT_SECRET}`,
    method: 'GET',
    headers: { 'user-agent': 'node.js' }
  };

  request(options, (error, response, body) => {
    if (error) console.error(error);
    if (response.statusCode !== 200) {
      return next(
        new ErrorResponse(`No github profile found for ${req.params.username}`, 404)
      );
    }

    res.status(200).json({ success: true, data: JSON.parse(body) });
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

// @desc    Delete a profile
// @route   DELETE /api/v1/profile/:id
// @access  Public
exports.deleteProfile = asyncHandler(async (req, res, next) => {
  const profile = await Profile.findById(req.params.id);

  if (!profile) {
    return next(new ErrorResponse(`Profile not found with id of ${req.params.id}`, 404));
  }

  // Make sure Profile belongs to user or user is an admin
  if (profile.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(new ErrorResponse(`Not authorized to update Profile`, 401));
  }

  await profile.remove();

  res.status(200).json({
    success: true,
    data: {}
  });
});
