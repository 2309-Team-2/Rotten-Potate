import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleSearch = async () => {
        try {
            const response = await fetch(`/api/movies?query=${query}`);
            const data = await response.json();

            // Assuming the backend responds with an array of movies
            onSearch(data);
        } catch (error) {
            console.error('Error searching for movies:', error);
        }
    };

    return (
        <div>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for movies..."
            />
            <button onClick={handleSearch}>Search</button>
        </div>
    );
};

export default SearchBar;