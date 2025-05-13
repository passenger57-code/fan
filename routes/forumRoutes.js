const express = require('express');
const router = express.Router();
const forumController = require('../controllers/forumController');
const auth = require('../middlewares/auth');

router.get('/', forumController.getAllTopics);
router.get('/category/:category', forumController.getTopicsByCategory);
router.get('/popular', forumController.getPopularTopics);
router.get('/:id', forumController.getTopic);
router.post('/', auth, forumController.createTopic);
router.post('/:id/replies', auth, forumController.addReply);

module.exports = router;