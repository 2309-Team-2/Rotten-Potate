const express = require('express');
const router = express.Router();
const db = require('../db/client');

// Endpoint to get all genres
router.get('/', async (req, res) => {
  try {
    if (req.query.category) {
      // Fetch movies for the specific genre
      const result = await db.query('SELECT * FROM movies WHERE genre = $1', [req.query.category]);
      const movies = result.rows;
      res.json(movies);
    } else {
      // Fetch all distinct genres
      const result = await db.query('SELECT DISTINCT genre FROM movies');
      const genres = result.rows.map((row) => row.genre);
      res.json(genres);
    }
  } catch (error) {
    console.error('Error fetching genres/movies:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/:genre?', async (req, res) => {
  try {
      if (req.params.genre) {
          // Fetch movies for the specific genre
          const result = await db.query('SELECT * FROM movies WHERE genre = $1', [req.params.genre]);
          const movies = result.rows;
          res.json(movies);
      } else {
          // Fetch all genres
          const result = await db.query('SELECT DISTINCT genre FROM movies');
          const genres = result.rows.map((row) => row.genre);
          res.json(genres);
      }
  } catch (error) {
      console.error('Error fetching genres/movies:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;