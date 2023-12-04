import React from 'react';

const SingleMovie = ({ movie }) => {
    return (
        <div>
            <h2>{movie.title}</h2>
            <p>Director: {movie.director}</p>
            <p>Release Date: {movie.releaseDate}</p>
            {/* Add other relevant information about the movie */}
        </div>
    );
};

export default SingleMovie;