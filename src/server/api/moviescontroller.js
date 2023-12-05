// moviescontroller.js - Router for movie-related endpoints

const express = require('express');
const { getAllMovies, getMovieById, addMovie } = require('../db/movie');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
      const movies = await getAllMovies();
      res.json(movies);
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
      const id = parseInt(req.params.id, 10); // Ensure the ID is an integer
      const movie = await getMovieById(id); // This function needs to be implemented in movie.js
      if (movie) {
          res.json(movie);
      } else {
          res.status(404).json({ error: 'Movie not found' });
      }
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
});


router.post('/', async (req, res) => {
  try {
      const newMovie = await addMovie(req.body);
      res.status(201).json(newMovie);
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
});

module.exports = router;
