// server/controllers/gamesController.js
const db = require('../db');

const getAllGames = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM games ORDER BY created_at DESC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getGameById = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM games WHERE id = ?', [req.params.id]);
    if (!rows.length) return res.status(404).json({ error: 'Game not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const addGame = async (req, res) => {
  const { title, genre, platform, status, rating, notes } = req.body;
  if (!title) return res.status(400).json({ error: 'Title is required' });
  try {
    const [result] = await db.query(
      `INSERT INTO games (title, genre, platform, status, rating, notes)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [title, genre || null, platform || null, status || 'wishlist', rating || null, notes || null]
    );
    const [newGame] = await db.query('SELECT * FROM games WHERE id = ?', [result.insertId]);
    res.status(201).json(newGame[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateGame = async (req, res) => {
  const { title, genre, platform, status, rating, notes } = req.body;
  try {
    const [result] = await db.query(
      `UPDATE games SET
         title    = COALESCE(?, title),
         genre    = COALESCE(?, genre),
         platform = COALESCE(?, platform),
         status   = COALESCE(?, status),
         rating   = COALESCE(?, rating),
         notes    = COALESCE(?, notes)
       WHERE id = ?`,
      [title, genre, platform, status, rating, notes, req.params.id]
    );
    if (!result.affectedRows) return res.status(404).json({ error: 'Game not found' });
    const [updated] = await db.query('SELECT * FROM games WHERE id = ?', [req.params.id]);
    res.json(updated[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteGame = async (req, res) => {
  try {
    const [result] = await db.query('DELETE FROM games WHERE id = ?', [req.params.id]);
    if (!result.affectedRows) return res.status(404).json({ error: 'Game not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getAllGames, getGameById, addGame, updateGame, deleteGame };
