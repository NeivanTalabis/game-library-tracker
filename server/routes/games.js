// server/routes/games.js
const express = require('express');
const router  = express.Router();
const {
  getAllGames, getGameById, addGame, updateGame, deleteGame,
} = require('../controllers/gamesController');

router.get('/',       getAllGames);
router.get('/:id',    getGameById);
router.post('/',      addGame);
router.put('/:id',    updateGame);
router.delete('/:id', deleteGame);

module.exports = router;
