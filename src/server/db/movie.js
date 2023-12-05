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
        const { title, description, genre, releaseYear, rating } = movieData;
        const result = await db.query(
            'INSERT INTO movies (title, description, genre, release_year, rating) VALUES ($1, $2, $3, $4, $5) RETURNING *;',
            [title, description, genre, releaseYear, rating]
            );
            return result.rows[0];
        } catch (err) {
            throw err;
        }
    }
    
    async function updateMovie(id, movieData) {
      const { title, description, genre, releaseYear, rating } = movieData;
      try {
          const result = await db.query(
              'UPDATE movies SET title = $2, description = $3, genre = $4, release_year = $5, rating = $6 WHERE id = $1 RETURNING *',
              [id, title, description, genre, releaseYear, rating]
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
    async function getReviewsByMovieId(movieId) {
        try {
            const query = 'SELECT * FROM reviews WHERE movie_id = $1';
            const values = [movieId];
      
            const result = await db.query(query, values);
            return result.rows;
        } catch (error) {
            throw error;
        }
      }

module.exports = {
    getAllMovies,
    getMovieById,
    addMovie, 
    updateMovie, 
    deleteMovie,
    getReviewsByMovieId
};