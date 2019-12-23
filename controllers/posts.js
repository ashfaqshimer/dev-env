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
// @access  Public
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

// @desc    Update a post
// @route   PUT /api/v1/posts/:id
// @access  Private/Admin
exports.updatePost = asyncHandler(async (req, res, next) => {
	let post = await Post.findById(req.params.id);

	if (!post) {
		return next(
			new ErrorResponse(`Post not found with id of ${req.params.id}`, 404)
		);
	}

	// Check to see if Post belongs to user or user is an admin
	if (post.user.toString() !== req.user.id && req.user.role !== 'admin') {
		return next(new ErrorResponse(`Not authorized to delete Post`, 401));
	}

	post = await Post.findByIdAndUpdate(req.params.id, req.body.text, {
		new: true,
		runValidators: true
	});

	res.status(200).json({
		success: true,
		data: post
	});
});

// @desc    Like a post
// @route   PUT /api/v1/posts/:id/like
// @access  Private/Admin
exports.likePost = asyncHandler(async (req, res, next) => {
	let post = await Post.findById(req.params.id);

	if (!post) {
		return next(
			new ErrorResponse(`Post not found with id of ${req.params.id}`, 404)
		);
	}

	// Check if user has already liked the post
	if (
		post.likes.filter((like) => like.user.toString() === req.user.id)
			.length > 0
	) {
		return next(new ErrorResponse(`Post has already been liked`, 400));
	}

	post.likes.unshift({ user: req.user.id });

	await post.save();

	res.status(200).json({
		success: true,
		count: post.likes.length,
		data: post.likes
	});
});

// @desc    Unlike a post
// @route   PUT /api/v1/posts/:id/unlike
// @access  Private/Admin
exports.unlikePost = asyncHandler(async (req, res, next) => {
	let post = await Post.findById(req.params.id);

	if (!post) {
		return next(
			new ErrorResponse(`Post not found with id of ${req.params.id}`, 404)
		);
	}

	// Check if user has already liked the post
	if (
		post.likes.filter((like) => like.user.toString() === req.user.id)
			.length === 0
	) {
		return next(new ErrorResponse(`Post has not been liked`, 400));
	}

	// Get remove index
	const removeIndex = post.likes
		.map((like) => like.user.toString())
		.indexOf(req.user.id);

	post.likes.splice(removeIndex, 1);

	await post.save();

	res.status(200).json({
		success: true,
		count: post.likes.length,
		data: post.likes
	});
});

// @desc    Delete a post
// @route   DELETE /api/v1/posts/:id
// @access  Private/Admin
exports.deletePost = asyncHandler(async (req, res, next) => {
	const post = await Post.findById(req.params.id);

	if (!post) {
		return next(
			new ErrorResponse(`Post not found with id of ${req.params.id}`, 404)
		);
	}

	// Check to see if Post belongs to user or user is an admin
	if (post.user.toString() !== req.user.id && req.user.role !== 'admin') {
		return next(new ErrorResponse(`Not authorized to delete Post`, 401));
	}

	await post.remove();

	res.status(200).json({
		success: true,
		data: {}
	});
});
