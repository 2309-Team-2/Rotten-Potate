import React, { useState, useEffect } from 'react';
import FeaturedMovie from './FeaturedMovie';

export default function Home() {
  const [moviesData, setMoviesData] = useState([]);

  useEffect(() => {
    // Fetch movies data asynchronously and set it in the state
    async function fetchMovies() {
      try {
        const response = await fetch('/api/movies'); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error(`Failed to fetch movies. Status: ${response.status}`);
        }

        const movies = await response.json();
        setMoviesData(movies);
      } catch (error) {
        console.error('Error fetching movies:', error.message);
      }
    }

    fetchMovies();
  }, []);

  return (
    <div className="home-container">
      {/* Featured Movie Section */}
      <FeaturedMovie movies={moviesData} />

      {/* All Movies Section */}
      <div className="top-movies-box">
        <h2>Top Movies</h2>

      </div>
    </div>
  );
}