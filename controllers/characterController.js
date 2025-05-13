const Character = require('../models/Character');

// Get all characters
exports.getAllCharacters = async (req, res) => {
  try {
    const characters = await Character.find({}).sort({ name: 1 });
    res.json(characters);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get characters by crew
exports.getCharactersByCrew = async (req, res) => {
  try {
    const characters = await Character.find({ crew: req.params.crew }).sort({ name: 1 });
    res.json(characters);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single character
exports.getCharacter = async (req, res) => {
  try {
    const character = await Character.findById(req.params.id);
    if (!character) {
      return res.status(404).json({ error: 'Character not found' });
    }
    res.json(character);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get popular characters
exports.getPopularCharacters = async (req, res) => {
  try {
    // In a real app, you'd track popularity (e.g., by favorites count)
    const characters = await Character.find({})
      .sort({ name: 1 })
      .limit(10);
    res.json(characters);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};