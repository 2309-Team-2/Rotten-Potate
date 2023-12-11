import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    onSearch(newQuery);
  };

  return (
    <div>
      <h2 className="searchbar-h2">Search by Title or Category</h2>
      <input className="search-bar"
        type="text"
        placeholder="Enter movie title..."
        value={query}
        onChange={handleSearch}
      />
    </div>
  );
};

export default SearchBar;