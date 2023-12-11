import React, { useState, useEffect } from 'react';


const CategoryFilter = ({ onFilterChange }) => {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All');
    

    useEffect(() => {
        const fetchGenres = async () => {
            try {
              const response = await fetch('/api/genres');
              if (!response.ok) {
                throw new Error(`Failed to fetch genres. Status: ${response.status}`);
              }
          
              const genresData = await response.json();
              const sortedCategories = ['All', ...genresData]
                .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))
                .sort((a, b) => (a === 'All' ? -1 : b === 'All' ? 1 : 0));
          
              setCategories(sortedCategories);
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