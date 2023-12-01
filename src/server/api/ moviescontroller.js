// moviescontroller.js - Router for movie-related endpoints

const express = require('express');
const { getAllMovies, addMovie } = require('../db/movie'); // Adjust the path as needed
const router = express.Router();

router.get('/', async (req, res) => {
  try {
      const movies = await getAllMovies();
      res.json(movies);
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