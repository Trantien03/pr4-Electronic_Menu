import React, { createContext, useReducer, useContext } from 'react';

// Khởi tạo context
const CartContext = createContext();

// Action types
const ADD_TO_CART = 'ADD_TO_CART';
const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
const ADJUST_QUANTITY = 'ADJUST_QUANTITY';

// Reducer để cập nhật trạng thái giỏ hàng
function cartReducer(state, action) {
    switch (action.type) {
        case ADD_TO_CART:
            return [...state, {...action.payload, quantity: 1}];
        case REMOVE_FROM_CART:
            return state.filter(item => item.id !== action.payload.id);
        case ADJUST_QUANTITY:
            return state.map(item =>
                item.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item
            );
        default:
            return state;
    }
}

// Provider component
export const CartProvider = ({ children }) => {
    const [cart, dispatch] = useReducer(cartReducer, []);

    // Actions
    const addToCart = (product) => {
        dispatch({ type: ADD_TO_CART, payload: product });
    };
    const removeFromCart = (productId) => {
        dispatch({ type: REMOVE_FROM_CART, payload: { id: productId } });
    };
    const adjustQuantity = (productId, quantity) => {
        dispatch({ type: ADJUST_QUANTITY, payload: { id: productId, quantity } });
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, adjustQuantity }}>
            {children}
        </CartContext.Provider>
    );
};

// Hook để sử dụng cart trong các components khác
export const useCart = () => useContext(CartContext);
