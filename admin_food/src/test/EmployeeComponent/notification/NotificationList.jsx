import React, { useEffect, useState } from "react";
import axios from "axios";

const NotificationList = () => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/v1/notifications");
                setNotifications(response.data); // Lưu dữ liệu vào state
            } catch (error) {
                console.error("Error fetching notifications:", error);
            }
        };

        fetchNotifications();
    }, []);

    return (
        <div className="p-4">
            <h2 className="text-lg font-bold mb-4">Yêu cầu của khách hàng</h2>
            <ul className="space-y-2">
                {notifications.map((notification) => (
                    <li key={notification.id} className="p-2 border border-gray-300 rounded">
                        <p><strong>Bàn:</strong> {notification.restaurantTable.nameTable}</p>
                        <p><strong>Thông báo:</strong> {notification.message}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default NotificationList;
