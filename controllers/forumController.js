const ForumTopic = require('../models/ForumTopic');
const Comment = require('../models/Comment');

// Get all forum topics
exports.getAllTopics = async (req, res) => {
  try {
    const topics = await ForumTopic.find({})
      .sort({ createdAt: -1 })
      .populate('author', 'username avatar')
      .populate('replies');
    res.json(topics);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get topics by category
exports.getTopicsByCategory = async (req, res) => {
  try {
    const topics = await ForumTopic.find({ category: req.params.category })
      .sort({ createdAt: -1 })
      .populate('author', 'username avatar')
      .populate('replies');
    res.json(topics);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single topic
exports.getTopic = async (req, res) => {
  try {
    const topic = await ForumTopic.findById(req.params.id)
      .populate('author', 'username avatar')
      .populate('replies');
    if (!topic) {
      return res.status(404).json({ error: 'Topic not found' });
    }
    
    // Increment view count
    topic.views += 1;
    await topic.save();
    
    res.json(topic);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new topic
exports.createTopic = async (req, res) => {
  try {
    const topic = new ForumTopic({
      ...req.body,
      author: req.user._id
    });
    
    await topic.save();
    res.status(201).json(topic);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Add a reply to a topic
exports.addReply = async (req, res) => {
  try {
    const topic = await ForumTopic.findById(req.params.id);
    if (!topic) {
      return res.status(404).json({ error: 'Topic not found' });
    }
    
    const comment = new Comment({
      content: req.body.content,
      author: req.user._id,
      parentType: 'ForumTopic',
      parentId: topic._id
    });
    
    await comment.save();
    topic.replies.push(comment._id);
    await topic.save();
    
    res.status(201).json(comment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get popular topics
exports.getPopularTopics = async (req, res) => {
  try {
    const topics = await ForumTopic.find({})
      .sort({ views: -1 })
      .limit(5)
      .populate('author', 'username avatar');
    res.json(topics);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};