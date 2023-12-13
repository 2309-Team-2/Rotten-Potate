// // movie.js in the 'db' directory

const db = require('./client'); // Adjust this path to your actual database client

async function getAllMovies() {
    try {
        const result = await db.query('SELECT * FROM movies'); // Adjust SQL as needed
        return result.rows;
    } catch (err) {
        throw err;
    }
}


async function getMovieById(id) {
    try {
        const result = await db.query('SELECT * FROM movies WHERE id = $1', [id]);
        if (result.rows.length) {
            return result.rows[0];
        } else {
            return null;
        }
    } catch (err) {
        throw err;
    }
}


async function addMovie(movieData) {
    try {
        const {imageUrl, title, description, genre, releaseYear, rating } = movieData;
        const result = await db.query(
            'INSERT INTO movies (image_url, title, description, genre, release_year, rating) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;',
            [imageUrl, title, description, genre, releaseYear, rating]
            );
            return result.rows[0];
        } catch (err) {
            throw err;
        }
    }
    
    async function updateMovie(id, movieData) {
      const { imageUrl, title, description, genre, releaseYear, rating } = movieData;
      try {
        const result = await db.query(
          'UPDATE movies SET image_url = $2, title = $3, description = $4, genre = $5, release_year = $6, rating = $7 WHERE id = $1 RETURNING *',
          [id, imageUrl, title, description, genre, releaseYear, rating]
        );
        return result.rows[0];
      } catch (err) {
        throw err;
      }
    }
    
    async function deleteMovie(id) {
      try {
          const result = await db.query(
              'DELETE FROM movies WHERE id = $1 RETURNING *',
              [id]
          );
          return result.rows[0];
      } catch (err) {
          throw err;
      }
    }
    

module.exports = {
    getAllMovies,
    getMovieById,
    addMovie, 
    updateMovie, 
    deleteMovie  
};