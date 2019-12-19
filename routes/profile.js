const express = require('express');
const {
  getCurrentProfile,
  getProfile,
  createProfile,
  updateProfile
} = require('../controllers/profile');
const { protect } = require('../middleware/auth');

const router = express.Router();

router
  .route('/')
  .post(protect, createProfile)
  .put(protect, updateProfile);

router.route('/me').get(protect, getCurrentProfile);

router.route('/:id').get(getProfile);

module.exports = router;
