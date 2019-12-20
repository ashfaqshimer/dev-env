const express = require('express');
const { createPost, getPosts, getPost } = require('../controllers/posts');
const { protect } = require('../middleware/auth');

const router = express.Router();

router
  .route('/')
  .get(protect, getPosts)
  .post(protect, createPost);

router.route('/:id').get(getPost);

module.exports = router;
