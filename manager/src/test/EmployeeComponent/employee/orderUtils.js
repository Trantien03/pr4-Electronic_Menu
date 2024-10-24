// orderUtils.js


import axios from "axios";

export const addItemToOrder = (orderedItems, item) => {
    const existingItem = orderedItems.find((orderedItem) => orderedItem.id === item.id);

    if (existingItem) {
        return orderedItems.map((orderedItem) =>
            orderedItem.id === item.id
                ? { ...orderedItem, quantity: orderedItem.quantity + 1 }
                : orderedItem
        );
    } else {
        // Nếu món chưa có trong order, thêm mới vào
        return [...orderedItems, { ...item, quantity: 1 }];
    }
};

// Hàm này dùng để thay đổi số lượng món ăn trong order
export const handleQuantityChange = (orderedItems, id, quantity) => {
    return orderedItems.map((orderedItem) =>
        orderedItem.id === id
            ? { ...orderedItem, quantity: quantity }
            : orderedItem
    );
};

// Hàm này dùng để lấy danh sách món ăn từ API
export const fetchDishes = async () => {
    try {
        const response = await fetch('http://localhost:8080/api/v1/dishes');
        if (!response.ok) {
            throw new Error('Failed to fetch dishes');
        }
        const data = await response.json();
        // Trả về mảng `content` chứa các món ăn từ dữ liệu trả về
        return data.content || []; // Đảm bảo trả về mảng, ngay cả khi content không tồn tại
    } catch (error) {
        console.error('Error fetching dishes:', error);
        return [];
    }
};


export const createOrder = async (orderRequest) => {
    try {
        const response = await axios.post("http://localhost:8080/api/v1/orders/orderTake", orderRequest);
        return response.data; // Trả về dữ liệu sau khi tạo đơn hàng thành công
    } catch (error) {
        console.error("Error creating order:", error);
        throw error;
    }
};