const Comment = require('../models/Comment');

// Get all comments for a parent (episode, news, or forum topic)
exports.getComments = async (req, res) => {
  try {
    const comments = await Comment.find({
      parentType: req.params.parentType,
      parentId: req.params.parentId
    })
      .populate('author', 'username avatar')
      .populate('replies')
      .sort({ createdAt: -1 });
    
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add a reply to a comment
exports.addReply = async (req, res) => {
  try {
    const parentComment = await Comment.findById(req.params.id);
    if (!parentComment) {
      return res.status(404).json({ error: 'Comment not found' });
    }
    
    const reply = new Comment({
      content: req.body.content,
      author: req.user._id,
      parentType: parentComment.parentType,
      parentId: parentComment.parentId
    });
    
    await reply.save();
    parentComment.replies.push(reply._id);
    await parentComment.save();
    
    res.status(201).json(reply);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Like a comment
exports.likeComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }
    
    // Check if user already liked the comment
    const alreadyLiked = comment.likes.includes(req.user._id);
    if (alreadyLiked) {
      comment.likes = comment.likes.filter(userId => userId.toString() !== req.user._id.toString());
    } else {
      comment.likes.push(req.user._id);
    }
    
    await comment.save();
    res.json(comment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a comment
exports.updateComment = async (req, res) => {
  try {
    const comment = await Comment.findOneAndUpdate(
      { _id: req.params.id, author: req.user._id },
      { content: req.body.content, isEdited: true },
      { new: true }
    );
    
    if (!comment) {
      return res.status(404).json({ error: 'Comment not found or unauthorized' });
    }
    
    res.json(comment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a comment
exports.deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findOneAndDelete({
      _id: req.params.id,
      author: req.user._id
    });
    
    if (!comment) {
      return res.status(404).json({ error: 'Comment not found or unauthorized' });
    }
    
    res.json({ message: 'Comment deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};