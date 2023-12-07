import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const MovieDetail = () => {
  const [movie, setMovie] = useState(null);
  const { movieId } = useParams();

  useEffect(() => {
    // Replace '/api/movies' with the actual API endpoint provided by your server
    fetch(`/api/movies/${movieId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Movie not found');
        }
        return response.json();
      })
      .then((data) => {
        setMovie(data);
      })
      .catch((error) => {
        console.error("Failed to load movies seed data", error);
      });
  }, [movieId]);

  if (!movie) {
    return <div>Movie not found!</div>;
  }

  return (
    <div className='single-movie-container'>
      <h2>{movie.title}</h2>
      <img src={movie.image_url} alt={movie.title} style={{ width: '100%', height: 'auto' }} />
      <p>Genre: {movie.genre}</p>
      <p>Release Year: {movie.releaseYear}</p>
      <p>Rating: {movie.rating}</p>
      <p>Description: {movie.description}</p>
      {/* Add other relevant information about the movie */}
    </div>
  );
};

export default MovieDetail;
