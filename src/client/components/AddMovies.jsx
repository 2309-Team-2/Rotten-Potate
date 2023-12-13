import React, { useState, useEffect } from 'react';

const AddMovieForm = ({ onMovieAdded, onMovieDeleted }) => {
  const [movies, setMovies] = useState([]);
  const [selectedMovieId, setSelectedMovieId] = useState('');
  const [newMovie, setNewMovie] = useState({
    imageUrl: '',
    title: '',
    description: '',
    genre: '',
    releaseYear: '',  // Assuming your movie model includes release year
    rating: ''        // Assuming your movie model includes rating
  });

  const handleChange = (e) => {
    setNewMovie({ ...newMovie, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/movies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMovie)
      });
      if (response.ok) {
        const addedMovie = await response.json();
        setNewMovie({imageUrl: '', title: '', description: '', genre: '', releaseYear: '', rating: '' });
        if (onMovieAdded) {
          onMovieAdded(addedMovie);
        }
      } else {
        console.error('Failed to add movie', response);
      }
    } catch (error) {
      console.error('Error adding movie', error);
    }
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('/api/movies');
        if (response.ok) {
          const moviesData = await response.json();
          setMovies(moviesData);
        } else {
          console.error('Failed to fetch movies');
        }
      } catch (error) {
        console.error('Error fetching movies', error);
      }
    };

    fetchMovies();
  }, []);

  const handleDelete = async () => {
    if (!selectedMovieId) return;

    const confirmed = window.confirm('Are you sure you want to delete this movie?');
    if (confirmed) {
      try {
        const response = await fetch(`/api/movies/${selectedMovieId}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          onMovieDeleted(selectedMovieId); // Update the parent component
          setSelectedMovieId(''); // Reset selected movie ID
          // Re-fetch movies or filter out the deleted movie from the state
          setMovies(movies.filter((movie) => movie.id !== selectedMovieId));
        } else {
          console.error('Failed to delete movie', response);
        }
      } catch (error) {
        console.error('Error deleting movie', error);
      }
    }
  };

  return (
    <>
    <form onSubmit={handleSubmit}>
      <input
      name="imageUrl"
      value={newMovie.imageUrl}
      onChange={handleChange}
      placeholder="Image URL"
       />
      <input
        name="title"
        value={newMovie.title}
        onChange={handleChange}
        placeholder="Title"
      />
      <input
        name="description"
        value={newMovie.description}
        onChange={handleChange}
        placeholder="Description"
      />
      <input
        name="genre"
        value={newMovie.genre}
        onChange={handleChange}
        placeholder="Genre"
      />
      <input
        name="releaseYear"
        value={newMovie.releaseYear}
        onChange={handleChange}
        placeholder="Release Year"
      />
      <input
        name="rating"
        value={newMovie.rating}
        onChange={handleChange}
        placeholder="Rating"
      />
      <button type="submit">Add Movie</button>
    </form>
    <div>
      <select value={selectedMovieId} onChange={(e) => setSelectedMovieId(e.target.value)}>
        <option value="">Select a movie to delete</option>
        {movies && movies.map((movie) => (
          <option key={movie.id} value={movie.id}>{movie.title}</option>
        ))}
      </select>
      <button onClick={handleDelete}>Delete Movie</button>
    </div>
  </>
  );
};

export default AddMovieForm;
