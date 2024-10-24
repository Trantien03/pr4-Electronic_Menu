import React from 'react';
import { useCart } from './CartContext';

const CartIcon = () => {
    const { cart } = useCart();
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <div className="cart-icon">
            <i className="fas fa-shopping-cart"></i>
            <span>{totalItems}</span>
        </div>
    );
};

export default CartIcon;
