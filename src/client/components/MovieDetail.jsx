

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CommentSection from "./CommentSection"; // Import CommentSection component

const MovieDetail = () => {
  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [comments, setComments] = useState([]);
  const [users, setUsers] = useState([]);
  const [userToken, setUserToken] = useState(null);
  const { movieId } = useParams();
  const [newReview, setNewReview] = useState('');
  const [newComment, setNewComment] = useState('');

  
  const handleReviewSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const storedUserToken = localStorage.getItem('userToken');
  
      if (!storedUserToken) {
        console.error('User is not logged in');
        return;
      }
  
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${storedUserToken}`,
        },
        body: JSON.stringify({
          movie_id: movieId,
          rating: 0,
          comment: newReview,
        }),
      });
  
      if (!response.ok) {
        console.error('Failed to submit review. Server returned:', response.status, response.statusText);
        throw new Error('Failed to submit review');
      }
  
      const createdReview = await response.json();
  
      // Update reviews state
      setReviews([...reviews, createdReview]);
      setNewReview('');
    } catch (error) {
      console.error('Error creating review:', error);
      res.status(500).json({ message: 'Internal server error', error: error.toString() })
      // Use proper error handling, res is not defined here
      // res.status(500).json({ message: 'Internal server error', error: error.toString() });
    }
  }
  const handleCommentSubmit = async (reviewId) => {
    try {
      if (!userToken) {
        console.error('User is not logged in');
        return;
      }

      console.log('Submitting comment:', { content: newComment });

      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`,
        },
        body: JSON.stringify({
          content: newComment,
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to submit comment');
      }
      
      const commentResponseData = await response.json(); // Store the JSON data in a variable
      
      // Update comments state
      setComments((prevComments) => [
        ...prevComments,
        { reviewId: reviewId, comments: [commentResponseData] },
      ]);
      
      setNewComment('');
    }   catch (error) {
      console.error('Error submitting comment:', error);
    
      // Check if there's a response object with details
      if (error.response) {
        console.error('Response details:', error.response);
      }
    }
  }
  const handleDeleteComment = async (reviewId, commentId) => {
    try {
      const userToken = localStorage.getItem('userToken');
      if (!userToken) {
        console.error('User is not logged in');
        return;
      }
  
      const response = await fetch(`/api/comments/${commentId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${userToken}`,
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete comment');
      }
  
      // Update comments state
      setComments((prevComments) => {
        const updatedComments = prevComments.map((item) => {
          if (item.reviewId === reviewId) {
            const updatedComments = item.comments.filter((comment) => comment.id !== commentId);
            return { reviewId: reviewId, comments: updatedComments };
          }
          return item;
        });
        return updatedComments;
      });
    } catch (error) {
      console.error('Error deleting comment:', error.message);
    }
  };
  
  const handleUpdateComment = async (reviewId, commentId, updatedText) => {
    try {
      const userToken = localStorage.getItem('userToken');
      if (!userToken) {
        console.error('User is not logged in');
        return;
      }
  
      const response = await fetch(`/api/comments/${commentId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`,
        },
        body: JSON.stringify({
          content: updatedText,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update comment');
      }
  
      const updatedComment = await response.json();
  
      // Update comments state
      setComments((prevComments) => {
        const updatedComments = prevComments.map((item) => {
          if (item.reviewId === reviewId) {
            const updatedComments = item.comments.map((comment) => {
              if (comment.id === commentId) {
                return { ...comment, content: updatedComment.content };
              }
              return comment;
            });
            return { reviewId: reviewId, comments: updatedComments };
          }
          return item;
        });
        return updatedComments;
      });
    } catch (error) {
      console.error('Error updating comment:', error.message);
    }
  };
  
  useEffect(() => {
    const fetchMovieAndReviews = async () => {
      try {
       
    
        console.log('Fetching Movie');
        const movieResponse = await fetch(`/api/movies/${movieId}`);
        if (!movieResponse.ok) {
          throw new Error(`Error fetching movie. Server returned: ${movieResponse.status} ${movieResponse.statusText}`);
        }
        const movieData = await movieResponse.json();
        console.log('Movie Data:', movieData);
        setMovie(movieData);
    
        console.log('Fetching Reviews');
        const reviewsResponse = await fetch(`/api/reviews/movies/${movieId}`);
        if (!reviewsResponse.ok) {
          throw new Error(`Error fetching reviews. Server returned: ${reviewsResponse.status} ${reviewsResponse.statusText}`);
        }
        const reviewsData = await reviewsResponse.json();
        console.log('Reviews Data:', reviewsData);
        setReviews(reviewsData);
    
        console.log('Fetching Users');
        const userIds = reviewsData.map((review) => review.user_id);
        console.log('User IDs:', userIds);
    
        const usersResponse = await fetch(`/api/users/${userIds.join(',')}`, {
          headers: {
            'Accept': 'application/json', // Explicitly state that the client expects JSON
          },
        });
    
        if (!usersResponse.ok) {
          throw new Error(`Error fetching users. Server returned: ${usersResponse.status} ${usersResponse.statusText}`);
        }
    
        let usersData;
    
        try {
          const responseText = await usersResponse.text();
          console.log('Users API Response Text:', responseText); // Log the response text
    
          usersData = JSON.parse(responseText);
        } catch (jsonError) {
          console.error('Failed to parse JSON for users:', jsonError);
          console.error('Response text:', await usersResponse.text());
          throw new Error('Failed to parse JSON for users');
        }
    
        setUsers(usersData);
    
        console.log('Fetching Comments');
        const commentsData = [];
    
        for (const review of reviewsData) {
          const commentResponse = await fetch(`/api/comments/reviews/${review.id}`);
    
          if (!commentResponse.ok) {
            throw new Error(`Error fetching comments for review ${review.id}. Server returned: ${commentResponse.status} ${commentResponse.statusText}`);
          }
    
          const commentData = (await commentResponse.json()).comments;
          commentsData.push({ reviewId: review.id, comments: commentData });
        }
    
        console.log('Comments Data:', commentsData);
    
        // Move the setComments outside the loop
        setComments(commentsData);
      } catch (error) {
        console.error('Error fetching movie details, reviews, users, or comments:', error);
      }
    };
  
    fetchMovieAndReviews();
  }, [movieId ]);
  
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
                <p>{review.comment}</p>
  
                <h4>Comments:</h4>
                {comments &&
  comments
    .find((item) => item.review_id === review.id)
    ?.comments?.map((comment) => (
      <div key={comment.id}>
                        <p>{comments.content}</p>
                      </div>
                    ))}
                <textarea
                  rows="4"
                  cols="50"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
                <button onClick={() => handleCommentSubmit(review.id)}>
                  Submit Comment
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <div>
            <p>No reviews available.</p>
          </div>
        )}
  
        <div>
          <h3>Leave a Review:</h3>
          <textarea
            rows="4"
            cols="50"
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
          />
          <button type="submit" onClick={handleReviewSubmit}>
            Submit Review
          </button>
        </div>
      </div>
    );
  }

  export default MovieDetail;