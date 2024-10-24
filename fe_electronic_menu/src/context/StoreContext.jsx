import { createContext, useEffect, useState, useCallback  } from "react";
import axios from 'axios';

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem('cartItems');
        return savedCart ? JSON.parse(savedCart) : {};
    });

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    const url = "http://localhost:8080";
    const [food_list, setFoodList] = useState([]);
    const [orderDishes, setOrderDishes] = useState([]);
    const [dishes, setListDishes] = useState([]);

    // Hàm lấy danh sách món ăn theo orderId
    const fetchDishesByOrderId = async (orderId) => {
        try {
            const response = await axios.get(`${url}/api/v1/order_item/${orderId}`);
            setListDishes(response.data);
            console.log("Fetched dishes list: ", response.data);
        } catch (error) {
            console.error("Error fetching dishes list:", error);
        }
    };

    useEffect(() => {
        const id = localStorage.getItem("IdOrder");
        if (id) {
            fetchDishesByOrderId(id);
        } else {
            console.warn("No order ID found in localStorage.");
        }
    }, []); // Chạy một lần khi component được mount

    // Hàm thêm sản phẩm vào giỏ hàng
    const addToCart = useCallback((dishId, quantity = 1, note = '') => {
        setCartItems(prevCart => {
            const updatedCart = { ...prevCart };
            if (updatedCart[dishId]) {
                updatedCart[dishId].quantity += quantity;
                updatedCart[dishId].note = note;
            } else {
                updatedCart[dishId] = { quantity, note };
            }
            return updatedCart;
        });
    }, []);


    // Hàm xóa sản phẩm khỏi giỏ hàng
    const removeFromCart = (id) => {
        setCartItems(prevItems => {
            const updatedItems = { ...prevItems };

            // Xóa toàn bộ sản phẩm ra khỏi giỏ hàng
            delete updatedItems[id];

            // Cập nhật localStorage
            localStorage.setItem('cartItems', JSON.stringify(updatedItems));

            return updatedItems;
        });
    };

    // Hàm cập nhật số lượng sản phẩm trong giỏ hàng
    const updateQuantity = (id, quantity) => {
        setCartItems(prevItems => {
            const updatedItems = { ...prevItems };
            const newQuantity = Math.max(0, quantity);
            if (newQuantity > 0) {
                updatedItems[id] = newQuantity;
            } else {
                delete updatedItems[id];
            }
            localStorage.setItem('cartItems', JSON.stringify(updatedItems));
            return updatedItems;
        });
    };

    // Tính tổng tiền giỏ hàng
    const getTotalCartAmount = useCallback(() => {
        return Object.values(cartItems).reduce(
            (total, item) => total + (item.quantity * item.price), 0
        );
    }, [cartItems]);

    // Hàm lấy danh sách món ăn
    const fetchFoodList = async () => {
        try {
            const response = await axios.get(`${url}/api/v1/dishes`);
            setFoodList(response.data.content || []);
            
            // Duyệt qua danh sách món ăn và log mô tả
            response.data.content.forEach(dish => {
                console.log(dish.description); // In mô tả của từng món ăn
            });
        } catch (error) {
            console.error("Error fetching food list:", error);
        }
    };
    

    const removeFromItem = (id) => {
    setCartItems(prevItems => {
        const updatedItems = { ...prevItems };
        
        if (updatedItems[id] && updatedItems[id].quantity > 1) {
            // Nếu số lượng sản phẩm lớn hơn 1, giảm số lượng
            updatedItems[id].quantity -= 1;
        } else {
            // Nếu số lượng sản phẩm bằng 1, xóa sản phẩm khỏi giỏ hàng
            delete updatedItems[id];
        }

        // Cập nhật giỏ hàng trong localStorage
        localStorage.setItem('cartItems', JSON.stringify(updatedItems));
        return updatedItems;
    });
};


    useEffect(() => {
        const loadData = async () => {
            await fetchFoodList(); // Lấy danh sách món ăn
        };
        loadData();
    }, []);

    const addToCart2 = useCallback((dishId, quantity = 1, note = '') => {
        setCartItems(prevCart => {
            const updatedCart = { ...prevCart };
            if (updatedCart[dishId]) {
                updatedCart[dishId].quantity += quantity;
                updatedCart[dishId].note = note;
            } else {
                updatedCart[dishId] = { quantity, note };
            }
            return updatedCart;
        });
    }, []);

    const removeAllFromCart = useCallback((dishId) => {
        setCartItems(prevCart => {
            const updatedCart = { ...prevCart };
            delete updatedCart[dishId]; // Xóa sản phẩm theo dishId
            return updatedCart;
        });
    }, []);

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        removeFromItem,
        updateQuantity,
        getTotalCartAmount,
        url,
        setFoodList,
        fetchFoodList,
        fetchDishesByOrderId,
        orderDishes,
        dishes,// Thêm danh sách món ăn theo order
        addToCart2,
        removeAllFromCart,
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
