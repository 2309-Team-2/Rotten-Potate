import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function FeaturedMovie({ movies }) {
  const moviesPerPage = 1; // Display only one movie at a time
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [movies]);

  const handlePrevClick = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextClick = () => {
    setCurrentPage((prevPage) =>
      Math.min(prevPage + 1, Math.ceil(movies.length / moviesPerPage))
    );
  };

  // Sort movies by release year in descending order
  const sortedMovies = [...movies].sort((a, b) => b.release_year - a.release_year);

  // Select the 10 latest releases
  const latestReleases = sortedMovies.slice(0, 10);

  // Select the featured movie based on the current page
  const featuredMovie = latestReleases[currentPage - 1];

  if (!movies || movies.length === 0) {
    return <div>Loading featured movie...</div>;
  }

  return (
    <div className='featured-container'>
      <div className="featured-movie-box">
        <div className="featured-content">
          {/* Navigation buttons */}
          <button onClick={handlePrevClick} disabled={currentPage === 1}>
            Prev
          </button>

          {/* Movie details */}
          <div className="movie-details">
          <Link to={`/movies/${featuredMovie.id}`} className="movie-link" style={{textDecoration: 'none'}}>
            <h3>{featuredMovie.title}</h3>
            <img src={featuredMovie.image_url} alt={featuredMovie.title} />
            <p>Genre: {featuredMovie.genre}</p>
            <p>Release Year: {featuredMovie.release_year}</p>
            <p>Rating: {featuredMovie.rating}</p>
            <p>Description: {featuredMovie.description}</p>
            </Link>
          </div>

          <button
            onClick={handleNextClick}
            disabled={currentPage === Math.ceil(latestReleases.length / moviesPerPage)}
          >
            Next
          </button>
        </div>

        {/* Pagination bar */}
        <div className="pagination-bar">
          {Array.from({ length: Math.ceil(latestReleases.length / moviesPerPage) }, (_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              disabled={currentPage === index + 1}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FeaturedMovie;
