const express = require('express');
const { createUser, loginUser, getMe } = require('../controllers/auth');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.route('/register').post(createUser);
router.route('/login').post(loginUser);
router.route('/me').get(protect, getMe);

module.exports = router;
