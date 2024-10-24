import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FoodItem from '../FoodItem/FoodItem';
import './FoodDisplay.css';
import { FaSearch } from 'react-icons/fa';

const FoodDisplay = ({ category }) => {
    const [foodList, setFoodList] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredFoodList, setFilteredFoodList] = useState([]);


    // Lấy danh sách món ăn theo category
    useEffect(() => {
        const fetchFoodList = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/v1/categories');
                const data = response.data;
                console.log("Data from API:", data);

                if (!category) {
                    console.log("Category is undefined.");
                    return;
                }

                console.log("Current category:", category);

                if (category === 'All') {
                    const allDishes = data.reduce((acc, curr) => acc.concat(curr.dishes || []), []);
                    console.log("All dishes:", allDishes);
                    setFoodList(allDishes);
                } else {
                    const selectedCategory = data.find(cat => cat.name?.toLowerCase() === category.toLowerCase());
                    console.log("Selected category:", selectedCategory);
                    if (selectedCategory && selectedCategory.dishes) {
                        setFoodList(selectedCategory.dishes);
                    } else {
                        console.log(`Category "${category}" not found or has no dishes.`);
                        setFoodList([]); // Clear list if category not found
                    }
                }
            } catch (error) {
                console.error("Error fetching food list:", error);
            }
        };

        fetchFoodList();
    }, [category]);

    // Lấy danh sách món ăn từ endpoint /dishes
    useEffect(() => {
        const fetchDishes = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/v1/dishes');
                console.log("Dishes:", response.data.content);
                const dishes = response.data.content;
                setFoodList(dishes);
            } catch (error) {
                console.error("Error fetching dishes:", error);
            }
        };

        fetchDishes();
    }, []);

    // Tìm kiếm món ăn theo từ khóa
    useEffect(() => {
        const results = foodList.filter(item =>
            item.name?.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredFoodList(results);
    }, [searchTerm, foodList]);

    return (
        <div className="food-display">
            <div className="food-display-header">
                <h2>Dishes List</h2>
                <div className="search-bar-container">
                    <FaSearch className="search-bar-icon" />
                    <input
                        type="text"
                        placeholder="Tìm kiếm món ăn..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-bar"
                    />
                </div>
            </div>
            <div className="food-display-list">
                {filteredFoodList.length === 0 ? (
                    <p>No items available in this category.</p>
                ) : (
                    filteredFoodList.map(item => (
                        <FoodItem
                            key={item.id}
                            id={item.id}
                            name={item.name}
                            price={item.price}
                            discount={item.discount}
                            image={item.image}
                        />
                    ))
                )}
            </div>

        </div>

    );
};

export default FoodDisplay;
