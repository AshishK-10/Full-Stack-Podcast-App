const express = require('express')
const {registerUser, authUser, allUsers, podcastsByArtist} = require('../controllers/userController');
const router = express.Router();
const {protect} = require('../middleware/authMiddleware') // authorization middleware

router.route('/')
.post(registerUser)
.get(protect, allUsers)

router.post('/login', authUser);
router.route('/:u_id')
.get(protect, podcastsByArtist)

module.exports = router;