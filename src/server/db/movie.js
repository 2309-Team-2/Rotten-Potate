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


module.exports = {
    getAllMovies,
    getMovieById,
    addMovie
};