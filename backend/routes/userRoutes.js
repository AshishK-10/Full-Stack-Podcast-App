const express = require('express')
const {registerUser, authUser, allUsers} = require('../controllers/userController');
const router = express.Router();
const {protect} = require('../middleware/authMiddleware') // authorization middleware

router.route('/')
.post(registerUser)
.get(protect, allUsers)

router.post('/login', authUser);

module.exports = router;