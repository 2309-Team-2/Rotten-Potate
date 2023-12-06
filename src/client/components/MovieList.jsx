import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CategoryFilter from './CategoryFilter';


async function fetchAllMovies() {
  try {
    const response = await fetch('/api/movies');
    if (!response.ok) {
      throw new Error(`Failed to fetch movies. Status: ${response.status}`);
    }

    const moviesData = await response.json();
    return moviesData;
  } catch (error) {
    console.error('Error fetching movies:', error.message);
    return [];
  }
}

function MovieList() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const moviesData = await fetchAllMovies();
      setMovies(moviesData);
    }

    fetchData();
  }, []);
  
  return (
    <div>
      <h2 className="movies-list-title">Movies List</h2>
      <CategoryFilter />
      <ul className='all-movies-list'>
        {movies.map((movie) => (
          <li key={movie.id} className="movie-item">
            <Link to={`/movies/${movie.id}`} 
            className="movie-link">
              <h3>{movie.title}</h3>
              <img src={movie.imageUrl} alt={movie.title} />
              <p>Release Year: {movie.release_year}</p>
              <p>Rating: {movie.rating}</p>
              {/* Add more details as needed */}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default MovieList;