import React, { useState, useEffect } from "react";
import FeaturedMovie from "./FeaturedMovie";
import TopRatedMovies from "./TopRatedMovies";

export default function Home() {
  const [moviesData, setMoviesData] = useState([]);

  useEffect(() => {
    // Fetch movies data asynchronously and set it in the state
    async function fetchMovies() {
      try {
        const response = await fetch("/api/movies");
        if (!response.ok) {
          throw new Error(`Failed to fetch movies. Status: ${response.status}`);
        }

        const movies = await response.json();
        setMoviesData(movies);
      } catch (error) {
        console.error("Error fetching movies:", error.message);
      }
    }

    fetchMovies();
  }, []);

  return (
    <>
      {/* Featured Movie Section */}
      <div className="featured-container">
        <div className="featured-movie-box">
          <FeaturedMovie movies={moviesData} />
          {/* Add featured movie content here */}
        </div>

        <div className="top-movies-box">
          <h2>Top Rated Movies</h2>
          <TopRatedMovies />
        </div>
      </>
    )

}

