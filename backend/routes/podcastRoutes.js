const express = require('express');
// authorization middleware
const {protect} = require('../middleware/authMiddleware')
const router = express.Router();
const {createPodcast, getPodcast, getAllPodcasts, likedPodcast, searchPodcasts} = require('../controllers/podcastController');

router.route('/')
.get(protect, getAllPodcasts)
.post(protect, createPodcast)

router.route('/:p_id')
.get(protect, getPodcast)

router.route('/likedPodcast')
.post(protect, likedPodcast);

module.exports = router;