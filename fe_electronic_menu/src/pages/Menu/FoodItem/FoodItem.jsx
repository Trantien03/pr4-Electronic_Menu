import React, { useContext, useState, useEffect } from "react";
import { assets } from "../../../assets/assets.js";
import { StoreContext } from "../../../context/StoreContext.jsx";
import FoodDetailModal from '../FoodDetailModal.jsx';
import { FaTag } from "react-icons/fa";

const FoodItem = ({ id, name, price, description, discount, image, status }) => {
    const { cartItems, addToCart2, removeFromItem, url } = useContext(StoreContext);

    const [quantity, setQuantity] = useState(cartItems?.[id]?.quantity || 0);
    const [showModal, setShowModal] = useState(false);

    const numericPrice = parseFloat(price) || 0;
    const numericDiscount = parseFloat(discount) || 0;
    const discountedPrice = numericPrice - (numericPrice * (numericDiscount / 100));

    const isAvailable = status === 'available';

    const handleFoodClick = () => {
        
        if(isAvailable){
            setShowModal(true);
        }
    };

    const handleAdd = () => {
        addToCart2(id, 1, '');  // Add one more item to the cart
        setQuantity(prev => prev + 1);  // Update the local quantity
    };

    const handleRemove = () => {
        removeFromItem(id);  // Remove one item from the cart
        setQuantity(prev => Math.max(prev - 1, 0));  // Update the local quantity, prevent negative values
    };

    const handleModalClose = () => {
        setShowModal(false);
        setQuantity(cartItems?.[id]?.quantity || 0);  // Reset quantity when closing the modal
    };

    useEffect(() => {
        setQuantity(cartItems?.[id]?.quantity || 0);  // Sync quantity with cartItems when cart is updated
    }, [cartItems, id]);

    return (
        <>
            <div className={`food-item ${!isAvailable ? 'opacity-50 cursor-not-allowed' : ''} bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-transform`}>
                <div className="relative">
                    {/* Display image with a clickable modal trigger */}
                    <img
                        className="w-full h-48 object-cover cursor-pointer"
                        src={image ? `${url}/images/${image}` : assets.default_image}
                        alt={name}
                        onClick={handleFoodClick}
                    />
                    {/* Discount Badge */}
                    {numericDiscount > 0 && (
                        <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 text-xs font-semibold rounded-full">
                            -{numericDiscount}%
                        </div>
                    )}

                    {/* Cart Interaction */}
                    <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
                        {quantity === 0 ? (
                            <img
                                className={`w-8 h-8 ${!isAvailable ? 'opacity-50 cursor-not-allowed' : ''}`}
                                onClick={isAvailable ? handleAdd : null}
                                src={assets.add_icon_white}
                                alt="Add to cart"
                            />
                        ) : (
                            <div className="flex items-center">
                                <img
                                    className="w-6 h-6 cursor-pointer"
                                    onClick={handleRemove}
                                    src={assets.remove_icon_red}
                                    alt="Remove from cart"
                                />
                                <p className="mx-2 text-lg text-white font-semibold">{quantity}</p>
                                <img
                                    className={`w-6 h-6 ${!isAvailable ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    onClick={isAvailable ? handleAdd : null}
                                    src={assets.add_icon_green}
                                    alt="Add more"
                                />
                            </div>
                        )}
                    </div>
                </div>

                {/* Food details */}
                <div className="p-4">
                    <div className="flex justify-between items-center mb-2">
                        <p className="text-lg font-semibold text-gray-800">{name} </p>
                    </div>

                    {/* Description */}
                        <p className="text-sm text-gray-600 mb-2">{description}</p>

                    {/* Price Display */}
                    <div className="flex justify-between items-center">
                        {numericDiscount === 0 ? (
                            <span className="text-xl font-semibold text-gray-800">${numericPrice.toFixed(2)}</span>
                        ) : (
                            <div className="flex items-center space-x-2">
                                <span className="line-through text-gray-500">${numericPrice.toFixed(2)}</span>
                                <span className="text-xl flex font-semibold text-red-600">
                                    ${discountedPrice.toFixed(2)} <FaTag className="ml-1 mt-1 text-red-600 text-lg" />
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Modal for food details */}
            <FoodDetailModal
                id={id}
                show={showModal}
                onHide={handleModalClose}
                food={{ id, name, price, discount, image, status, description }}
            />
        </>
    );
};

export default FoodItem;
