import React, { useState, useEffect } from 'react';

const AddMovieForm = ({ onMovieAdded, onMovieDeleted }) => {
  const [movies, setMovies] = useState([]);
  const [selectedMovieId, setSelectedMovieId] = useState('');
  const [newMovie, setNewMovie] = useState({
    imageUrl: '',
    title: '',
    description: '',
    genre: '',
    releaseYear: '',
    rating: ''
  });
  const [editedImage, setEditedImage] = useState('');
  const [editedTitle, setEditedTitle] = useState('');
  const [editedDescription, setEditedDescription] = useState('');
  const [editedGenre, setEditedGenre] = useState('');
  const [editedRelease, setEditedRelease] = useState('');
  const [editedRating, setEditedRating] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    setNewMovie({ ...newMovie, [e.target.name]: e.target.value });
  };

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
        setNewMovie({
          imageUrl: '',
          title: '',
          description: '',
          genre: '',
          releaseYear: '',
          rating: ''
        });

        // Fetch the updated list of movies
        const updatedMoviesResponse = await fetch('/api/movies');
        const updatedMoviesData = await updatedMoviesResponse.json();
        setMovies(updatedMoviesData);

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

  const handleSelectChange = async (e) => {
    const selectedId = e.target.value;
    setSelectedMovieId(selectedId);

    if (selectedId) {
      try {
        const response = await fetch(`/api/movies/${selectedId}`);
        if (response.ok) {
          const selectedMovie = await response.json();
          setEditedImage(selectedMovie.image_url);
          setEditedTitle(selectedMovie.title);
          setEditedDescription(selectedMovie.description);
          setEditedGenre(selectedMovie.genre);
          setEditedRelease(selectedMovie.release_year);
          setEditedRating(selectedMovie.rating);
        } else {
          console.error('Failed to fetch movie details for editing', response);
        }
      } catch (error) {
        console.error('Error fetching movie details for editing', error);
      }
    }
  };

  const fetchAllMovies = async (e) => {
    e.preventDefault();
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
  };

  const handleDelete = async () => {
    if (!selectedMovieId) return;
  
    const confirmed = window.confirm('Are you sure you want to delete this movie?');
    if (confirmed) {
      try {
        const response = await fetch(`/api/movies/${selectedMovieId}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          setMovies((prevMovies) => prevMovies.filter((movie) => movie.id !== selectedMovieId));
  
          onMovieDeleted(selectedMovieId);
  
          setSelectedMovieId('');
        } else {
          console.error('Failed to delete movie', response);
        }
      } catch (error) {
        console.error('Error deleting movie', error);
      }
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`api/movies/${selectedMovieId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          imageUrl: editedImage || movies.imageUrl,
          title: editedTitle || movies.title,
          description: editedDescription || movies.description,
          genre: editedGenre || movies.genre,
          releaseYear: editedRelease || movies.releaseYear,
          rating: editedRating || movies.rating,
        }),
      });
      if (response.ok) {
        await fetchAllMovies();
        setIsEditing(false);
      } else {
        const errorData = await response.json();
        console.error(
          'Error updating movie data:',
          response.status,
          response.statusText,
          errorData
        );
      }
    } catch (error) {
      console.error('Error during movie data update:', error);
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

  return (
    <>
      <div className="add-movie-form">
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <label>
              Image URL:
              <input
                type="text"
                name="imageUrl"
                value={newMovie.imageUrl}
                onChange={handleChange}
                className="form-input"
                placeholder="Image URL"
              />
            </label>
            <label>
              Title:
              <input
                type="text"
                name="title"
                value={newMovie.title}
                onChange={handleChange}
                className="form-input"
                placeholder="Title"
              />
            </label>
          </div>
          <div className="form-row">
            <label>
              Description:
              <input
                type="text"
                name="description"
                value={newMovie.description}
                onChange={handleChange}
                className="form-input"
                placeholder="Description"
              />
            </label>
            <label>
              Genre:
              <input
                type="text"
                name="genre"
                value={newMovie.genre}
                onChange={handleChange}
                className="form-input"
                placeholder="Genre"
              />
            </label>
          </div>
          <div className="form-row">
            <label>
              Release Year:
              <input
                type="text"
                name="releaseYear"
                value={newMovie.releaseYear}
                onChange={handleChange}
                className="form-input"
                placeholder="Release Year"
              />
            </label>
            <label>
              Rating:
              <input
                type="text"
                name="rating"
                value={newMovie.rating}
                onChange={handleChange}
                className="form-input"
                placeholder="Rating"
              />
            </label>
          </div>
          <button type="submit" className="form-button">
            Add Movie
          </button>
        </form>
      </div>
      <div>
        <div className="movie-select-box">
        <div className="movie-select-container">
          <select
            value={selectedMovieId}
            onChange={handleSelectChange}
            className="form-select"
          >
            <option value="">Select a movie to edit/delete</option>
            {movies &&
              movies.map((movie) => (
                <option key={movie.id} value={movie.id}>
                  {movie.title}
                </option>
              ))}
          </select>
        </div>
        {!isEditing && (
          <button id="update-button" onClick={() => setIsEditing(true)} className="form-button">
            Edit Movie
          </button>
        )}
        <button onClick={handleDelete} className="form-button">
          Delete Movie
        </button>
        </div>
        {isEditing && (
          <div className="editing-box">
            <label>
              Image:
              <input
                type="text"
                value={editedImage}
                onChange={(e) => setEditedImage(e.target.value)}
              />
            </label>
            <label>
              Title:
              <input
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
              />
            </label>
            <label>
              Description:
              <input
                type="text"
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
              />
            </label>
            <label>
              Genre:
              <input
                type="text"
                value={editedGenre}
                onChange={(e) => setEditedGenre(e.target.value)}
              />
            </label>
            <label>
              Release Year:
              <input
                type="text"
                value={editedRelease}
                onChange={(e) => setEditedRelease(e.target.value)}
              />
            </label>
            <label>
              Rating:
              <input
                type="text"
                value={editedRating}
                onChange={(e) => setEditedRating(e.target.value)}
              />
            </label>
            <button onClick={handleUpdate} className="form-button">
              Save
            </button>
            <button onClick={() => setIsEditing(false)} className="form-button">
              Cancel
            </button>
          </div>
        )}
      </div>
    </>
  );
  
};

export default AddMovieForm;
