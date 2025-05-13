const express = require('express');
const router = express.Router();
const episodeController = require('../controllers/episodeController');
const auth = require('../middlewares/auth');

router.get('/', episodeController.getAllEpisodes);
router.get('/featured', episodeController.getFeaturedEpisodes);
router.get('/:id', episodeController.getEpisode);
router.post('/:id/comments', auth, episodeController.addComment);
router.post('/:id/rate', auth, episodeController.rateEpisode);

module.exports = router;