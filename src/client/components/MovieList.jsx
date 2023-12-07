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
  const [filteredMovies, setFilteredMovies] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const moviesData = await fetchAllMovies();
      setMovies(moviesData);
      setFilteredMovies(moviesData); // Initialize filtered movies with all movies
    }

    fetchData();
  }, []);

  const handleFilterChange = async (selectedCategory) => {
    try {
      console.log('Selected Category:', selectedCategory);
  
      const response = await fetch(`/api/genres?category=${selectedCategory}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch movies. Status: ${response.status}`);
      }
  
      const moviesData = await response.json();
      console.log('Filtered Movies:', moviesData);
  
      setFilteredMovies(moviesData);
    } catch (error) {
      console.error('Error fetching movies:', error.message);
    }
  };
  

return (
  <div>
    <h2 className="movies-list-title">Movies List</h2>
    <CategoryFilter onFilterChange={handleFilterChange} />
    <ul className='all-movies-list'>
  {filteredMovies.map((movie, index) => (
    <li key={movie.id || index} className="movie-item">
      <Link to={`/movies/${movie.id}`} className="movie-link">
        <img src={movie.image_url} alt={movie.title} className="movie-image" />
        <h3>{movie.title}</h3>
        {/* Display the movie image */}
        <p>Release Year: {movie.releaseYear}</p>
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
