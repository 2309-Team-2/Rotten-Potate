import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const MovieDetail = () => {
  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [comments, setComments] = useState([]);
  const { movieId } = useParams();

  useEffect(() => {
    const fetchMovieAndReviews = async () => {
      try {
        // Fetch movie details
        const movieResponse = await fetch(`/api/movies/${movieId}`);
        if (!movieResponse.ok) {
          throw new Error('Movie not found');
        }
        const movieData = await movieResponse.json();
        setMovie(movieData);

        // Fetch reviews for the movie
        const reviewsResponse = await fetch(`/api/reviews/${movieId}`);
        if (!reviewsResponse.ok) {
          throw new Error('Failed to fetch reviews');
        }
        const reviewsData = await reviewsResponse.json();
        setReviews(reviewsData);

        // Fetch comments for the reviews
        const commentsResponse = await fetch(`/api/comments/${movieId}`);
        if (!commentsResponse.ok) {
          throw new Error('Failed to fetch comments');
        }
        const commentsData = await commentsResponse.json();
        setComments(commentsData);
      } catch (error) {
        console.error('Error fetching movie details, reviews, or comments:', error);
      }
    };

    fetchMovieAndReviews();
  }, [movieId]);

  if (!movie) {
    return <div>Movie not found!</div>;
  }

  return (
    <div className='single-movie-container'>
      <h2>{movie.title}</h2>
      <img src={movie.image_url} alt={movie.title} />
      <p>Genre: {movie.genre}</p>
      <p>Release Year: {movie.release_year}</p>
      <p>Rating: {movie.rating}</p>
      <p>Description: {movie.description}</p>

      <h3>Reviews:</h3>
      {reviews.length > 0 ? (
        <ul>
          {reviews.map((review) => (
            <li key={review.id}>
              <p>{review.user}</p>
              <p>{review.comment}</p>
              {/* Add other relevant review information */}
            </li>
          ))}
        </ul>
      ) : (
        <p>No reviews available.</p>
      )}

      <h3>Comments:</h3>
      {comments.length > 0 ? (
        <ul>
          {comments.map((comment) => (
            <li key={comment.id}>
              <p>{comment.user}</p>
              <p>{comment.content}</p>
              {/* Add other relevant comment information */}
            </li>
          ))}
        </ul>
      ) : (
        <p>No comments available.</p>
      )}
    </div>
  );
};

export default MovieDetail;
