import React, { useState, useEffect } from "react";

function RandomMovie() {
  const [movies, setMovies] = useState([]); // Array of movies
  const [randomMovie, setRandomMovie] = useState(null); // Randomly selected movie

  useEffect(() => {
    // Fetch movies from API or set them manually
    const fetchMovies = async () => {
      try {
        // Replace with your API call to fetch the movies from the database
        const response = await fetch("/api/movies");
        const data = await response.json();
        setMovies(data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  useEffect(() => {
    // Select a random movie
    if (movies.length > 0) {
      const randomIndex = Math.floor(Math.random() * movies.length);
      setRandomMovie(movies[randomIndex]);
    }
  }, [movies]);

  const handleRandomMovieClick = () => {
    if (movies.length > 0) {
      const randomIndex = Math.floor(Math.random() * movies.length);
      setRandomMovie(movies[randomIndex]);
    }
  };

  return (
    <div className="random-movie">
      {randomMovie && (
        <div>
          <h3>What to watch:</h3>
          <p>Title: {randomMovie.title}</p>
          <img
            src={randomMovie.image_url}
            alt={randomMovie.title}
            style={{ height: "500px" }}
          />
          <p>Genre: {randomMovie.genre}</p>
          <p>Description: {randomMovie.description}</p>
          <p>Release Year: {randomMovie.release_year}</p>
          <p>Rating: {randomMovie.rating}</p>
          {/* Add other movie properties as needed */}
        </div>
      )}
      <button className="random-button" onClick={handleRandomMovieClick}>Watch Next</button>
    </div>
  );
}

export default RandomMovie;
