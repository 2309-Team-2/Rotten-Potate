import React from 'react';
import TopRatedMovies from './TopRatedMovies';

export default function Home() {
  return (
      <>
        {/* Featured Movie Section */}
        <div className='featured-container'>
          <div className="featured-movie-box">
            <h2>Featured Movie</h2>
        {/* Add featured movie content here */}
          </div>
        </div>
        {/* All Movies Section */}
        <div className="top-movies-box">
          <h2>Top Rated Movies</h2>
          <TopRatedMovies />
        </div>
      </>
    )
}