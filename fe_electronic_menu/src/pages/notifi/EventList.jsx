import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const url = "http://localhost:8080"; // Đường dẫn API cơ bản của bạn

const EventList = () => {
    const [events, setEvents] = useState([]);

    // Fetch events từ API
    const fetchEvents = async () => {
        try {
            const response = await axios.get(`${url}/api/v1/events`);
            if (response.data && Array.isArray(response.data)) {
                setEvents(response.data); // Cập nhật danh sách sự kiện
            } else {
                toast.error("Không có dữ liệu sự kiện hoặc dữ liệu không phải là mảng.");
            }
        } catch (error) {
            toast.error("Lỗi khi lấy dữ liệu sự kiện.");
            console.error("Lỗi khi lấy sự kiện:", error);
        }
    };

    useEffect(() => {
        fetchEvents(); // Gọi hàm fetchEvents khi component được mount
    }, []);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString(); // Format ngày với toLocaleDateString
    };

    return (
        <div className="p-6 bg-gray-50">
            <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-orange-600">Promotional Event</h2>
            </div>
            {/* Nếu có sự kiện */}
            {events.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-6">
                    {events.map((event) => (
                        <div
                            className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl cursor-pointer"
                            key={event.id}
                        >
                            <div className="p-5">
                                {/* Title */}
                                <h5 className="text-xl font-semibold text-orange-600 mb-2">
                                    {event.name || "Không tên"}
                                </h5>
                                {/* Discount */}
                                <p className="text-gray-600 mb-2">
                                    <span className="font-medium text-gray-800">Discount: </span>
                                    <span className="text-red-600">{event.discount || 0}%</span>
                                </p>
                                {/* Dates */}
                                <p className="text-gray-600 mb-2">
                                    <span className="font-medium text-gray-800">Start Date: </span>
                                    {formatDate(event.startDay)}
                                </p>
                                <p className="text-gray-600">
                                    <span className="font-medium text-gray-800">End Date: </span>
                                    {formatDate(event.endDay)}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                // Nếu không có sự kiện
                <div className="text-center">
                    <p className="text-lg font-semibold text-gray-600">The restaurant currently has no events.</p>
                </div>
            )}
        </div>
    );
};

export default EventList;
