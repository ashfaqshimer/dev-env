const asyncHandler = require('../middleware/asyncHandler');
const Post = require('../models/Post');
const ErrorResponse = require('../utils/ErrorResponse');

// @desc    Create a Post
// @route   POST /api/v1/posts
// @access  Private/Admin
exports.createPost = asyncHandler(async (req, res, next) => {
  req.body.user = req.user.id;

  const post = await Post.create(req.body);

  res.status(200).send({ success: true, data: post });
});

// @desc    Get all posts
// @route   POST /api/v1/posts
// @access  Private/Admin
exports.getPosts = asyncHandler(async (req, res, next) => {
  const posts = await Post.find()
    .populate({
      path: 'user',
      select: 'name avatar'
    })
    .sort({ created_at: -1 });

  res.status(200).send({ success: true, count: posts.length, data: posts });
});

// @desc    Get a single post
// @route   POST /api/v1/posts/:id
// @access  Private/Admin
exports.getPost = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.id)
    .populate({
      path: 'user',
      select: 'name avatar'
    })
    .sort({ created_at: -1 });

  res.status(200).send({ success: true, data: post });
});
