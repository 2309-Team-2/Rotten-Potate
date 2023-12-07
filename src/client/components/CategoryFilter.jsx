import React, { useState, useEffect } from 'react';


const CategoryFilter = ({ onFilterChange }) => {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All');
    

    useEffect(() => {
        // Fetch genres from your API endpoint or use the genres from moviesSeedData directly
        const fetchGenres = async () => {
            try {
                const response = await fetch('/api/genres');
                if (!response.ok) {
                    throw new Error(`Failed to fetch genres. Status: ${response.status}`);
                }
    
                const genresData = await response.json();
                setCategories(['All', ...genresData]); // Add 'All' as the default option
            } catch (error) {
                console.error('Error fetching genres:', error.message);
            }
        };
    
        fetchGenres();
    }, []);

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        onFilterChange(category);
    };

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
        </div>
    );
};

export default CategoryFilter;