import React, { useContext, useState, useEffect } from "react";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import './FoodItem.css';

const FoodItem = ({ id, name, price, discount, image, status }) => { // Thêm status vào props
    const { cartItems, addToCart, removeFromItem, url } = useContext(StoreContext);
    const [quantity, setQuantity] = useState(cartItems?.[id] || 0);
    const [isAdding, setIsAdding] = useState(false); // Trạng thái quản lý nút hoạt động

    const numericPrice = parseFloat(price);
    const numericDiscount = parseFloat(discount);
    const discountedPrice = numericPrice - (numericPrice * (numericDiscount / 100));

    // Đồng bộ hóa số lượng khi cartItems thay đổi
    useEffect(() => {
        setQuantity(cartItems?.[id] || 0);
    }, [cartItems, id]);

    const handleAdd = () => {
        console.log("Adding product ID: ", id); // Thêm dòng này để kiểm tra
        setQuantity(prev => prev + 1);
        addToCart(id);
    };

    const handleRemove = () => {
        console.log("Removing product ID: ", id); // Thêm dòng này để kiểm tra
        if (quantity > 0) {
            setQuantity(prev => prev - 1);
            removeFromItem(id)
        }
    };

    console.log('Status of food item:', status); // Kiểm tra giá trị status
    const isAvailable = status === 'available';


    return (
        <div className={`food-item ${!isAvailable ? 'disabled' : ''}`}> {/* Thêm lớp disabled */}
            <div className="food-item-img-container">
                <img className='food-item-image' src={`${url}/images/${image}`} alt={name} />
                {discount > 0 && <div className='food-item-discount'>-{numericDiscount}%</div>}

                <div className='food-item-counter'>
                    {quantity === 0 ? (
                        <img
                            className={`add ${isAdding ? 'active' : ''} ${!isAvailable ? 'disabled' : ''}`} // Thêm lớp disabled
                            onClick={isAvailable ? handleAdd : null} // Chỉ cho phép thêm nếu còn hàng
                            src={assets.add_icon_white}
                            alt="Add to cart"
                        />
                    ) : (
                        <>
                            <img
                                className='remove'
                                onClick={handleRemove}
                                src={assets.remove_icon_red}
                                alt="Remove from cart"
                            />
                            <p className="quantity-display">{quantity}</p>
                            <img
                                className='add'
                                onClick={isAvailable ? handleAdd : null} // Chỉ cho phép thêm nếu còn hàng
                                src={assets.add_icon_green}
                                alt="Add more"
                            />
                        </>
                    )}
                </div>
            </div>
            <div className="food-item-info">
                <div className="food-item-name-rating">
                    <p>{name}</p>
                </div>
                <div className="food-item-price">
                    <span className="original-price">${numericPrice.toFixed(2)}</span>
                    <span className="discounted-price">${discountedPrice.toFixed(2)}</span>
                </div>
            </div>
        </div>
    );
};

export default FoodItem;
