const express = require('express');
const router = express.Router();
const characterController = require('../controllers/characterController');

router.get('/', characterController.getAllCharacters);
router.get('/crew/:crew', characterController.getCharactersByCrew);
router.get('/popular', characterController.getPopularCharacters);
router.get('/:id', characterController.getCharacter);

module.exports = router;