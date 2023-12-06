const express = require('express');
const router = express.Router();
const db = require('../db/client');

// Endpoint to get all genres
router.get('/', async (req, res) => {
  try {

    const result = await db.query('SELECT DISTINCT genre FROM movies');
    const genres = result.rows.map((row) => row.genre);
    res.json(genres);
  } catch (error) {
    console.error('Error fetching genres:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/:genre', async (req, res) => {
    const { genre } = req.params;
    console.log('Requested genre:', genre);
    try {
      const result = await db.query('SELECT * FROM movies WHERE genre = $1', [genre]);
      const movies = result.rows;
      res.json(movies);
    } catch (error) {
      console.error(`Error fetching movies for genre '${genre}':`, error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }); 

module.exports = router;