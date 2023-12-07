import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
const TopRatedMovies = () => {
  // State to hold the top-rated movies
  const [topRatedMovies, setTopRatedMovies] = useState([]);

  // Effect to fetch top-rated movies when the component mounts
  useEffect(() => {
    const fetchTopRatedMovies = async () => {
      try {
        // Fetch movies from the /api/movies endpoint
        const response = await fetch('/api/movies');
        const movies = await response.json();

        // Sort movies by rating in descending order and take the top 5
        const topMovies = movies
          .sort((a, b) => b.rating - a.rating)
          .slice(0, 5);

        setTopRatedMovies(topMovies);
      } catch(error) {

      }
    };

    fetchTopRatedMovies();
  }, []);

  return (
    <div>
      <ul className="toprated">
        {topRatedMovies.map((movie) => (
          <li key={movie.title}>
            <Link to={`/movies/${movie.id}`} className="movie-link">
            <img src={movie.image_url} alt={movie.title} style={{ width: '100px', height: '150px' }} />
            <p>{movie.title}</p>
            <p>Rating: {movie.rating}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopRatedMovies;