import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './Order.css';

const OrderCard = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/v1/orders/status?status=Pending`);
                console.log(response.data);
                if (response.status === 200) {
                    setOrders(response.data);
                } else {
                    toast.error("Lỗi khi lấy thông tin đơn hàng");
                }
            } catch (error) {
                console.error("Lỗi khi lấy thông tin đơn hàng:", error);
                toast.error("Có lỗi xảy ra khi lấy thông tin đơn hàng");
            }
        };

        fetchOrders();
    }, []);

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
    };

    const handleCompleteOrder = async (id) => {
        try {
            const response = await axios.patch(`http://localhost:8080/api/v1/orders/${id}?status=PendingPayment`);
            if (response.status === 200) {
                toast.success("Đơn hàng đã hoàn tất");
                setOrders((prevOrders) => prevOrders.filter(order => order.id !== id));
            } else {
                toast.error("Lỗi khi thay đổi trạng thái đơn hàng");
            }
        } catch (error) {
            console.error("Lỗi khi thay đổi trạng thái đơn hàng:", error);
            toast.error("Có lỗi xảy ra khi thay đổi trạng thái đơn hàng");
        }
    };

    const orderList = useMemo(() => {
        if (orders.length === 0) return <p>Không có đơn hàng nào</p>;

        return orders.map((order) => {
            // Chọn lớp CSS dựa trên order.type
            const orderClass = order.type === "Dine_in" ? "bg-red-200" : "bg-yellow-200"; // Màu nền cho đơn hàng

            return (
                <div key={order.id} className={`border border-gray-300 rounded-lg p-4 m-2 w-80 shadow-lg ${orderClass}`}>
                    <div className="flex justify-between items-center mb-4">
                        <div>
                            <div className="text-red-600 font-bold text-lg">
                                {order.table ? `BÀN: ${order.table.nameTable}` : order.type}
                            </div>
                            <div className="text-gray-500 text-sm">{formatDate(order.createAt)}</div>
                            <div className="text-gray-500 text-sm">Mã đơn: {order.billNumber}</div>
                            <div className="text-gray-500 text-sm">{order.type}</div>
                        </div>
                        <button
                            onClick={() => handleCompleteOrder(order.id)}
                            className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600 transition"
                        >
                            Hoàn tất
                        </button>
                    </div>
                    <ul className="bg-gray-50 p-3 rounded-md space-y-2">
                        {order.items && Array.isArray(order.items) ? (
                            order.items.map((item) => (
                                <li key={item.id} className="bg-white border border-gray-300 rounded-md shadow-sm p-3 text-gray-700">
                                    <div className="font-semibold text-lg">{item.dish.name}    x{ item.quantity}</div>
                                    <div className="flex justify-between items-center mt-1">
                                        <div className="text-sm">{item.price.toFixed(2)} đ</div>
                                    </div>
                                </li>
                            ))
                        ) : (
                            <p>Không có món ăn nào trong đơn hàng</p>
                        )}
                    </ul>
                </div>
            );
        });
    }, [orders]);

    return <div className="flex flex-wrap">{orderList}</div>;
};

export default OrderCard;
