import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';

const MenuHeader = ({ searchTerm, setSearchTerm, goHome, setSelectedCategory }) => {
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null); // Trạng thái để theo dõi danh mục đang hoạt động

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/v1/categories');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };

    fetchCategories();
  }, []);

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
    setActiveCategory(categoryId); // Cập nhật danh mục đang hoạt động
  };

  return (
    <div className=" p-4 mb-4 ">
      <div className="flex items-center justify-between mb-4">
        <div className="relative flex-grow mx-2 ">
          <input
            type="text"
            placeholder="Search for dishes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-10 rounded-full py-3 px-4 pr-10 w-full focus:outline-none focus:ring-2 focus:ring-orange-300 transition duration-300 ease-in-out shadow-md bg-gradient-to-r from-orange-100 to-blue-100 placeholder-gray-500"
          />
          <FaSearch className="absolute right-3 top-2.5 text-orange-600" />
        </div>
      </div>
    </div>
  );
};

export default MenuHeader;
