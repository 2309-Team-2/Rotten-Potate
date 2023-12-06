import React from 'react';

const MovieDetail = ({ movie }) => {
    return (
        <div> 
            <h2>{movie.title}</h2>
            <p>Director: {movie.director}</p>
            <p>Release Date: {movie.releaseDate}</p>
            <p>Average Rating: {movie.averageRating}</p>
            {/* Add other relevant information about the movie */}
        </div>
    );
};

export default MovieDetail;