const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const auth = require('../middlewares/auth');

router.get('/:parentType/:parentId', commentController.getComments);
router.post('/:id/replies', auth, commentController.addReply);
router.post('/:id/like', auth, commentController.likeComment);
router.patch('/:id', auth, commentController.updateComment);
router.delete('/:id', auth, commentController.deleteComment);

module.exports = router;