import React, { useEffect, useContext, useState } from "react";
import { Card } from "react-bootstrap";
import axios from "axios";
import { StoreContext } from "../../context/StoreContext.jsx";
import EventList from "./EventList.jsx";

const DishesItem = () => {
    const { url } = useContext(StoreContext); // lấy URL từ context
    const [dishes, setDishes] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);

    useEffect(() => {
        const orderId = localStorage.getItem("IdOrder");
        if (orderId) {
            fetchDishes(orderId);
        } else {
            console.warn("Không tìm thấy order ID trong localStorage.");
        }
    }, []);

    // Hàm sử dụng axios để gọi API lấy danh sách món ăn
    const fetchDishes = async (orderId) => {
        try {
            const response = await axios.get(`${url}/api/v1/order_item/${orderId}`);
            setDishes(response.data); // Cập nhật danh sách món ăn từ API
        } catch (error) {
            console.error("Lỗi khi lấy dữ liệu món ăn:", error);
        }
    };


    useEffect(() => {
        // Tính tổng tiền mỗi khi danh sách món ăn thay đổi
        const total = dishes.reduce((acc, item) => acc + item.price * item.quantity, 0);
        setTotalAmount(total);
    }, [dishes]);

    return (
        <>
            {dishes.length > 0 ? (
                dishes.map((item) => (
                    <Card key={item.id} className="flex flex-row items-center p-4 shadow-md mb-4 bg-white rounded-lg hover:shadow-lg transition-shadow duration-300">
                        <div className="item-image">
                            <img
                                src={item.dish?.image ? `${url}/images/${item.dish.image}` : "default-image.jpg"}
                                alt={item.dish?.name || "Món ăn"}
                                className="rounded-full border border-gray-300"
                                style={{ width: "80px", height: "80px", objectFit: "cover" }}
                            />
                        </div>
                        <div className="item-info ms-4 flex-grow-1">
                            <div className="item-title text-lg font-semibold">
                                <span className="item-quantity text-red-600">{item.quantity} × </span> {item.dish?.name || "Không xác định"}
                            </div>
                            <div className="item-price text-gray-600 font-medium">{item.price.toLocaleString()} $</div>
                        </div>
                    </Card>
                ))
            ) : (
                <div className="text-center text-gray-500">No food items found</div>
            )}
            <div className="total-amount text-lg font-bold mt-4">
             Total amount: {totalAmount.toLocaleString()} $
            </div>
        </>
    );
};

export default DishesItem;
