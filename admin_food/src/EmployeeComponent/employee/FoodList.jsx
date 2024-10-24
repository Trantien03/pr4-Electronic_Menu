import React, { useState, useEffect } from "react";
import MenuHeader from './MenuHeader.jsx';
import { useNavigate, useSearchParams } from "react-router-dom";
import { FaTag, FaChevronLeft, FaChevronRight } from "react-icons/fa"; // Add icon imports

const FoodList = ({ foodList, addItem }) => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [categories, setCategories] = useState([]);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const itemsPerPage = 8; // Số món ăn hiển thị trên mỗi trang
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    // Lọc món ăn dựa trên từ khóa và danh mục được chọn
    const filteredFoodList = foodList.filter(dish => {
        const matchesSearchTerm = dish.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === null || dish.categoryId === selectedCategory;
        return matchesSearchTerm && matchesCategory;
    });

    // Tính toán số lượng trang sau khi lọc
    const totalPages = Math.ceil(filteredFoodList.length / itemsPerPage);

    // Tính toán chỉ số bắt đầu và kết thúc của món ăn cho trang hiện tại
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredFoodList.slice(indexOfFirstItem, indexOfLastItem);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/v1/categories');
                const data = await response.json();
                setCategories(data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };
        fetchCategories();
    }, []);

    // Chuyển đến trang tiếp theo
    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    // Chuyển đến trang trước
    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="w-full max-w-7xl mx-auto">
            {/* MenuHeader */}
            <div className={`w-full md:w-2/4 mb-4 md:mb-0 ${isMenuOpen ? 'block' : 'hidden'} md:block`}>
                <MenuHeader
                    categories={categories}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                />
            </div>

            {/* Danh sách món ăn */}
            <div className="p-2 overflow-y-auto mx-4 my-0" style={{ maxHeight: '400vh' }}>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {currentItems.map((dish) => (
                        <div key={dish.id} className="text-center border border-gray-300 rounded-lg shadow-lg p-4 bg-white hover:bg-orange-50 transition duration-300 transform hover:scale-105">
                            <img
                                src={dish.image ? `http://localhost:8080/images/${dish.image}` : "https://placehold.co/150x150"}
                                alt={dish.name}
                                className="mx-auto mb-3 h-36 w-36 object-cover rounded-md shadow-sm border border-gray-300"
                            />
                            <h3 className="text-xl font-semibold mb-1 truncate" style={{ maxWidth: '100%' }}>
                                {dish.name}
                            </h3>
                            <span className="block mb-2">
                                {dish.discount && dish.discount !== "0" ? (
                                    <>
                                        <del className="text-gray-500">{dish.price}$</del><br />
                                        <div className="flex justify-center items-center">
                                            
                                            <span className="text-red-600 font-bold  text-xl">
                                                {`$${(dish.price * (1 - parseFloat(dish.discount) / 100)).toFixed(0)}`}
                                            </span>
                                            <FaTag className="mr-2 text-red-600 ml-1" /> {/* Icon voucher giảm giá */}
                                        </div>
                                    </>
                                ) : (
                                    <span className="text-black font-bold">{dish.price}$</span>
                                )}
                            </span>

                            <span className={`block font-semibold ${dish.status === "available" ? "text-green-500" : "text-gray-500"}`}>
                                {dish.status === "available" ? "Available" : "Unavailable"}
                            </span>
                            {dish.status === "available" && (
                                <button className="bg-orange-400 text-white px-4 py-2 mt-3 rounded-lg transition duration-300 ease-in-out hover:bg-orange-500 shadow-md transform hover:scale-105" onClick={() => addItem(dish)}>
                                    Add to Cart
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Phân trang với icon */}
            <div className="flex justify-between items-center mt-6">
                <button onClick={prevPage} disabled={currentPage === 1} className="bg-orange-300 text-white p-3 rounded-lg transition duration-300 ease-in-out hover:bg-orange-500 font-semibold shadow-md disabled:opacity-50 transform hover:scale-110">
                    <FaChevronLeft className="text-lg" />
                </button>
                <span className="font-semibold">
                    {currentPage} / {totalPages}
                </span>
                <button onClick={nextPage} disabled={currentPage === totalPages} className="bg-orange-300 text-white p-3 rounded-lg transition duration-300 ease-in-out hover:bg-orange-500 font-semibold shadow-md disabled:opacity-50 transform hover:scale-110">
                    <FaChevronRight className="text-lg" />
                </button>
            </div>
        </div>
    );
};

export default FoodList;
