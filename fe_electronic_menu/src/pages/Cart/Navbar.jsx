import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { StoreContext } from "../../context/StoreContext.jsx";

const Navbar = () => {
    const { setCartItems } = useContext(StoreContext);
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1); // Quay lại trang trước
    };

    const handleClearCart = () => {
        localStorage.removeItem('cartItems');
        setCartItems({});
        console.log("Giỏ hàng đã bị xóa");
    };

    return (
        <div className="flex justify-between items-center p-4 bg-white shadow-md rounded-md">
            <div className="back-button">
                <button 
                    className="flex items-center text-gray-600 hover:text-blue-600 transition duration-200"
                    onClick={handleBack}
                >
                    <i className="bi bi-chevron-left mr-1"></i>
                    <span>Back</span>
                </button>
            </div>
            <div className="navbar-title flex-grow text-center">
                <h3 className="text-lg font-semibold text-gray-800">Selected Dishes</h3>
            </div>
            <div className="clear-cart-button">
                <button 
                    className="bg-red-500 text-white rounded-lg px-4 py-2 hover:bg-red-600 transition duration-200"
                    onClick={handleClearCart}
                >
                    Clear cart
                </button>
            </div>
        </div>
    );
}

export default Navbar;
