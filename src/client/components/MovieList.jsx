import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CategoryFilter from './CategoryFilter';
import SearchBar from './SearchBar';

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

function MovieList({ searchResults }) {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);

  useEffect(() => {
    if (searchResults && searchResults.length > 0) {
      setFilteredMovies(searchResults);
    } else {
      setFilteredMovies(movies);
    }
  }, [searchResults, movies]);

  useEffect(() => {
    async function fetchData() {
      const moviesData = await fetchAllMovies();
      setMovies(moviesData);
      setFilteredMovies(moviesData);
    }

    fetchData();
  }, []);

  const handleFilterChange = async (selectedCategory) => {
    try {
      if (selectedCategory === 'All') {
        setFilteredMovies(movies);
      } else {
        const response = await fetch(`/api/genres?category=${selectedCategory}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch movies. Status: ${response.status}`);
        }

        const moviesData = await response.json();
        setFilteredMovies(moviesData);
      }
    } catch (error) {
      console.error('Error fetching movies:', error.message);
    }
  };

  // Define the handleSearch function for SearchBar
  const handleSearch = async (query) => {
    try {
      console.log('Query:', query);

      // Ensure that query is a string before performing the search
      if (typeof query === 'string') {
        const filteredMovies = movies.filter((movie) =>
          movie.title.toLowerCase().includes(query.toLowerCase())
        );

        setFilteredMovies(filteredMovies);
      } else {
        console.error('Invalid query:', query);
      }
    } catch (error) {
      console.error('Error handling search results:', error.message);
    }
  };

  return (
    <div>
      <div className="movies-header-container">
        <div className="movies-header">
        <h2>All Movies</h2>
        </div>
        <div className="search-bar-container">
        <SearchBar onSearch={handleSearch} />
        </div>
        <div className="category-filter">
        <CategoryFilter onFilterChange={handleFilterChange} />
        </div>
      </div>

      <ul className='all-movies-list'>
        {filteredMovies.map((movie, index) => (
          <li key={movie.id || index} className="movie-item">
            <Link to={`/movies/${movie.id}`} className="movie-link">
              <img src={movie.image_url} alt={movie.title} className="movie-image" />
              <h3>{movie.title}</h3>
              <p>Release Year: {movie.releaseYear}</p>
              <p>Rating: {movie.rating}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MovieList;
