const express = require('express');
const { getUsers, getUser, createUser, deleteUser } = require('../controllers/userController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// All routes here are protected and require Admin role
router.use(protect);
router.use(authorize('Admin'));

router.route('/')
    .get(getUsers)
    .post(createUser);

router.route('/:id')
    .get(getUser)
    .delete(deleteUser);

module.exports = router;
