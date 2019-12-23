const express = require('express');
const {
	createPost,
	getPosts,
	getPost,
	updatePost,
	deletePost,
	likePost,
	unlikePost,
	commentPost,
	deleteComment
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

router.route('/:id/comment').put(protect, commentPost);
router.route('/:id/comment/:comment_id').delete(protect, deleteComment);

module.exports = router;
