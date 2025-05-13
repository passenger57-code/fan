const express = require('express');
const router = express.Router();
const newsController = require('../controllers/newsController');
const auth = require('../middlewares/auth');

router.get('/', newsController.getAllNews);
router.get('/category/:category', newsController.getNewsByCategory);
router.get('/featured', newsController.getFeaturedNews);
router.get('/:id', newsController.getNews);
router.post('/:id/comments', auth, newsController.addComment);

module.exports = router;