import React, { useEffect, useState } from "react";
import axios from "axios";

const NotificationList = () => {
    const [notifications, setNotifications] = useState([]);
    const [error, setError] = useState(null); // Để lưu thông báo lỗi
    const [message, setMessage] = useState(null); // Để lưu thông báo thành công

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/v1/notifications");
                setNotifications(response.data); // Lưu dữ liệu vào state
            } catch (error) {
                console.error("Error fetching notifications:", error);
                setError("Failed to fetch notifications."); // Lưu thông báo lỗi
            }
        };

        fetchNotifications();
    }, []);

    // Hàm để xóa thông báo khỏi cơ sở dữ liệu
    const deleteNotification = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/v1/notifications/${id}`);
            setMessage("Notification deleted successfully!"); // Thông báo thành công
        } catch (error) {
            console.error("Error deleting notification:", error);
            setError("Failed to delete notification."); // Thông báo lỗi
        }
    };

    // Hàm để xác nhận thông báo
    const handleConfirm = (id) => {
        deleteNotification(id); // Gọi hàm xóa thông báo từ cơ sở dữ liệu
        setNotifications((prevNotifications) => 
            prevNotifications.filter(notification => notification.id !== id) // Cập nhật giao diện
        );
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl text-center font-semibold text-gray-800 mb-4 border-b-2 border-gray-200 pb-2">
                Customer Request
            </h2>
            {error && <p className="text-red-500">{error}</p>}
            {message && <p className="text-green-500">{message}</p>}
            <ul className="space-y-4">
                {notifications.map((notification) => (
                    <li key={notification.id} className="p-4 border border-gray-300 rounded-lg transition-transform transform hover:scale-105 hover:shadow-lg">
                        <p className="text-sm text-gray-500">
                            <strong>Table:</strong> {notification.restaurantTable.nameTable}
                        </p>
                        <p className="text-gray-700">
                            <strong>Description:</strong> {notification.message}
                        </p>
                        <button
                            onClick={() => handleConfirm(notification.id)}
                            className="mt-2 px-4 py-1 text-white bg-blue-500 rounded hover:bg-blue-600"
                        >
                            Confirm
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default NotificationList;
