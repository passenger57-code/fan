const Episode = require('../models/Episode');
const Comment = require('../models/Comment');

// Get all episodes
exports.getAllEpisodes = async (req, res) => {
  try {
    const episodes = await Episode.find({})
      .sort({ episodeNumber: -1 })
      .populate('comments');
    res.json(episodes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single episode
exports.getEpisode = async (req, res) => {
  try {
    const episode = await Episode.findById(req.params.id).populate('comments');
    if (!episode) {
      return res.status(404).json({ error: 'Episode not found' });
    }
    
    // Increment view count
    episode.views += 1;
    await episode.save();
    
    res.json(episode);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get featured episodes
exports.getFeaturedEpisodes = async (req, res) => {
  try {
    const episodes = await Episode.find({})
      .sort({ views: -1 })
      .limit(5)
      .populate('comments');
    res.json(episodes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add a comment to an episode
exports.addComment = async (req, res) => {
  try {
    const episode = await Episode.findById(req.params.id);
    if (!episode) {
      return res.status(404).json({ error: 'Episode not found' });
    }
    
    const comment = new Comment({
      content: req.body.content,
      author: req.user._id,
      parentType: 'Episode',
      parentId: episode._id
    });
    
    await comment.save();
    episode.comments.push(comment._id);
    await episode.save();
    
    res.status(201).json(comment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Rate an episode
exports.rateEpisode = async (req, res) => {
  try {
    const episode = await Episode.findById(req.params.id);
    if (!episode) {
      return res.status(404).json({ error: 'Episode not found' });
    }
    
    // Simple rating system - in a real app you'd want a more sophisticated approach
    episode.rating = req.body.rating;
    await episode.save();
    
    res.json(episode);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};