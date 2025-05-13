const News = require('../models/News');
const Comment = require('../models/Comment');

// Get all news
exports.getAllNews = async (req, res) => {
  try {
    const news = await News.find({})
      .sort({ createdAt: -1 })
      .populate('author', 'username avatar')
      .populate('comments');
    res.json(news);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get news by category
exports.getNewsByCategory = async (req, res) => {
  try {
    const news = await News.find({ category: req.params.category })
      .sort({ createdAt: -1 })
      .populate('author', 'username avatar')
      .populate('comments');
    res.json(news);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get featured news
exports.getFeaturedNews = async (req, res) => {
  try {
    const news = await News.find({ isFeatured: true })
      .sort({ createdAt: -1 })
      .limit(3)
      .populate('author', 'username avatar')
      .populate('comments');
    res.json(news);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single news item
exports.getNews = async (req, res) => {
  try {
    const news = await News.findById(req.params.id)
      .populate('author', 'username avatar')
      .populate('comments');
    if (!news) {
      return res.status(404).json({ error: 'News not found' });
    }
    res.json(news);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add a comment to news
exports.addComment = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    if (!news) {
      return res.status(404).json({ error: 'News not found' });
    }
    
    const comment = new Comment({
      content: req.body.content,
      author: req.user._id,
      parentType: 'News',
      parentId: news._id
    });
    
    await comment.save();
    news.comments.push(comment._id);
    await news.save();
    
    res.status(201).json(comment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};