import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState('');
  
    const handleSearch = async () => {
      try {
        const response = await fetch(`/api/movies?query=${query}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch movies. Status: ${response.status}`);
        }
  
        const data = await response.json();
        onSearch(data);
      } catch (error) {
        console.error('Error searching for movies:', error.message);
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
        <button type="button" onClick={handleSearch}>
          Search
        </button>
      </div>
    );
  };
  
  export default SearchBar;