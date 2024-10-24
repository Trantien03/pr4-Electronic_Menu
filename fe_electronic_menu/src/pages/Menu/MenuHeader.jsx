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
        <button onClick={goHome} className="text-orange-500 hover:text-orange-600 transition-colors">
          <HomeRoundedIcon fontSize="large" />
        </button>

        <div className="relative flex-grow mx-2 ">
          <input
            type="text"
            placeholder="What do you want to find..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-10 rounded-full py-3 px-4 pr-10 w-full focus:outline-none focus:ring-2 focus:ring-orange-300 transition duration-300 ease-in-out shadow-md bg-gradient-to-r from-orange-100 to-blue-100 placeholder-gray-500"
          />
          <FaSearch className="absolute right-3 top-2.5 text-orange-600" />
        </div>
      </div>

      <div className="flex flex-wrap">
        <button
          className={`font-semibold rounded-full px-4 py-2 m-1 transition duration-200 ease-in-out ${activeCategory === null ? 'text-orange-600 border border-orange-600' : 'text-gray-700 border border-transparent hover:border-gray-300'}`}
          onClick={() => handleCategoryClick(null)} // Gọi hàm khi nhấn vào "Tất cả"
        >
          All
        </button>

        {filteredCategories.map((category) => (
          <button
            key={category.id}
            className={`font-semibold rounded-full px-4 py-2 m-1 transition duration-200 ease-in-out ${activeCategory === category.id ? 'text-white bg-orange-400 border border-orange-400' : 'text-gray-700 border border-transparent hover:border-gray-300'}`}
            onClick={() => handleCategoryClick(category.id)} // Gọi hàm khi nhấn vào danh mục
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MenuHeader;
