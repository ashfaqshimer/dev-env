const express = require('express');
const {
	createPost,
	getPosts,
	getPost,
	updatePost,
	deletePost,
	likePost,
	unlikePost
} = require('../controllers/posts');
const { protect } = require('../middleware/auth');

const router = express.Router();

router
	.route('/')
	.get(getPosts)
	.post(protect, createPost);

router
	.route('/:id')
	.get(getPost)
	.put(protect, updatePost)
	.delete(protect, deletePost);

router.route('/:id/like').put(protect, likePost);

router.route('/:id/unlike').put(protect, unlikePost);

module.exports = router;
