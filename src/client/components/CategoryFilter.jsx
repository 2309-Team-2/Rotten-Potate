import React, { useState, useEffect } from 'react';

const CategoryFilter = ({ onFilterChange }) => {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedCategoryMovies, setSelectedCategoryMovies] = useState([]);

    // Fetch both all genres and single genres from your API
    const fetchGenres = async () => {
        try {
            // Fetch all genres
            const allGenresResponse = await fetch('/api/genres');
            if (!allGenresResponse.ok) {
                throw new Error(`Failed to fetch all genres. Status: ${allGenresResponse.status}`);
            }
            const allGenresData = await allGenresResponse.json();

            // Fetch movies for the selected genre
            const selectedGenreResponse = await fetch(`/api/genres/${selectedCategory}`);
            if (!selectedGenreResponse.ok) {
                throw new Error(`Failed to fetch movies for genre. Status: ${selectedGenreResponse.status}`);
            }
            const selectedGenreData = await selectedGenreResponse.json();

            // Combine and set categories
            setCategories(['All', ...allGenresData]);
            // Update movies for the selected genre in the state
            setSelectedCategoryMovies(selectedGenreData);
            // Include movies for the selected genre in the state
            onFilterChange(selectedCategory, selectedGenreData);
        } catch (error) {
            console.error('Error fetching genres:', error.message);
        }
    };

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        if (category === 'All') {
            // Fetch all genres
            fetchGenres();
        } else {
            // Fetch movies for the selected genre
            fetchGenres(category);
        }
    };

    useEffect(() => {
        // Initial fetch when component mounts
        fetchGenres();
    }, []); // Empty dependency array ensures this runs only once on mount

    return (
        <div>
            <h2>Filter by Category</h2>
            <select value={selectedCategory} onChange={(e) => handleCategoryChange(e.target.value)}>
                {categories.map((category) => (
                    <option key={category} value={category}>
                        {category}
                    </option>
                ))}
            </select>

            <h3>Movies for {selectedCategory}</h3>
            <ul>
                {selectedCategoryMovies.map((movie) => (
                    <li key={movie.id}>{movie.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default CategoryFilter;