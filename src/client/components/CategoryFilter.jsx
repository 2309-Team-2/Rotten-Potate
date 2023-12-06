import React, { useState, useEffect } from 'react';


const CategoryFilter = ({ onFilterChange }) => {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All');

    useEffect(() => {
        // Fetch both all genres and single genres from your API
        const fetchGenres = async () => {
            try {
                // Fetch all genres
                const allGenresResponse = await fetch('/api/genres');
                if (!allGenresResponse.ok) {
                    throw new Error(`Failed to fetch all genres. Status: ${allGenresResponse.status}`);
                }
                const allGenresData = await allGenresResponse.json();

                // Fetch single genres
                const singleGenresResponse = await fetch('/api/genres/:genre');
                if (!singleGenresResponse.ok) {
                    throw new Error(`Failed to fetch single genres. Status: ${singleGenresResponse.status}`);
                }
                const singleGenresData = await singleGenresResponse.json();

                // Combine and set categories
                setCategories(['All', ...allGenresData, ...singleGenresData]);
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