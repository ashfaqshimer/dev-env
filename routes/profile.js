const express = require('express');
const {
	getCurrentProfile,
	getProfile,
	createProfile,
	updateProfile,
	getProfiles,
	deleteProfile,
	getGithubProfiles,
	addExperience,
	addEducation,
} = require('../controllers/profile');
const { protect } = require('../middleware/auth');

const router = express.Router();

router
	.route('/')
	.get(getProfiles)
	.post(protect, createProfile)
	.put(protect, updateProfile);

router.put('/experience', protect, addExperience);
router.put('/education', protect, addEducation);

router.route('/me').get(protect, getCurrentProfile);

router.route('/:id').get(getProfile).delete(protect, deleteProfile);

router.route('/github/:username').get(getGithubProfiles);

module.exports = router;
