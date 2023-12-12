// moviescontroller.js - Router for movie-related endpoints

const express = require('express');
const { getAllMovies, getMovieById, addMovie, deleteMovie, updateMovie, } = require( '../db/movie', );
const {getReviewsByMovieId} = require('../db/reviews')
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
      const id = parseInt(req.params.id, 10);
  
      if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid movie ID' });
      }
  
      const movie = await getMovieById(id);
  
      if (movie) {
        res.json(movie);
      } else {
        res.status(404).json({ error: 'Movie not found' });
      }
    } catch (err) {
      console.error('Error handling movie request:', err.message);
      res.status(500).json({ error: 'Internal server error' });
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

router.patch('/:id', async (req, res) => {
    const movieId = req.params.id;
    const updatedMovieData = req.body;

    try {
        // Check if the movie exists
        const existingMovie = await getMovieById(movieId);
        if (!existingMovie) {
            return res.status(404).json({ message: 'Movie not found' });
        }

        // Check if there are reviews associated with the movie
        const reviews = await getReviewsByMovieId(movieId);
        if (reviews.length > 0) {
            return res.status(400).json({ message: 'Cannot update a movie with associated reviews' });
        }

        // Update the movie
        const updatedMovie = await updateMovie(movieId, updatedMovieData);
        res.json(updatedMovie);
    } catch (err) {
        res.status(500).json({ message: 'Internal server error', error: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    const movieId = req.params.id;

    try {
        // Check if the movie exists
        const existingMovie = await getMovieById(movieId);
        if (!existingMovie) {
            return res.status(404).json({ message: 'Movie not found' });
        }

        // Check if there are reviews associated with the movie
        const reviews = await getReviewsByMovieId(movieId);
        if (reviews.length > 0) {
            // If there are reviews, delete them first
            await deleteReviewsByMovieId(movieId);
        }

        // Delete the movie
        const deletedMovie = await deleteMovie(movieId);
        res.json({ message: 'Movie deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Internal server error', error: err.message });
    }
});

module.exports = router;
