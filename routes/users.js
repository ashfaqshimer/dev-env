const express = require('express');
const { getUsers, getUser,deleteUser } = require('../controllers/users');

const { protect } = require('../middleware/auth');

const router = express.Router();

router
  .route('/')
  .get(getUsers)

router.route('/:id').get(getUser).delete(protect, deleteUser);

module.exports = router;
