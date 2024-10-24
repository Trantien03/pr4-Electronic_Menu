import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const OrderCard = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/v1/orders/status?status=Pending`);
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
        if (orders.length === 0) return <p className="text-white-500 text-center px-10 mt-20" style={{ fontSize: "24px", fontWeight: "bold" }}>There are no orders</p>;

        return orders.map((order) => {
            const orderClass = order.type === "Dine_in" ? "bg-orange-100" : "bg-yellow-200"; // Màu nền cho đơn hàng

            return (
                <div key={order.id} className={`border border-gray-300 rounded-lg p-4 m-2 sm:m-4 w-full sm:w-80 shadow-lg transition-transform transform hover:scale-105 ${orderClass}`}>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                        <div className="mb-2 sm:mb-0">
                            <div className="text-red-600 font-bold text-lg">
                                {order.table ? `Table: ${order.table.nameTable}` : order.type}
                            </div>
                            <div className="text-gray-500 text-sm">{formatDate(order.createAt)}</div>
                            <div className="text-gray-500 text-sm">Order code: {order.billNumber}</div>
                            <div className="text-gray-500 text-sm">{order.type}</div>
                        </div>
                        <button
                            onClick={() => handleCompleteOrder(order.id)}
                            className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600 transition"
                        >
                        Complete
                        </button>
                    </div>
                    <ul className="bg-gray-50 p-3 rounded-md space-y-2 max-h-80 overflow-y-auto">
                        {order.items && Array.isArray(order.items) ? (
                            order.items.map((item) => (
                                <li key={item.id} className="bg-white border border-gray-300 rounded-md shadow-sm p-3 text-gray-700 flex items-center justify-between hover:bg-gray-100 transition-colors">
                                    <div className="flex flex-col">
                                        <div className="flex items-center">
                                        <div className={`font-semibold text-lg ${item.completed ? 'line-through text-gray-400' : ''}`}>
                                            {item.dish.name} <span className="text-red-600 ">x{item.quantity}</span> 
                                        </div>

                                            
                                        </div>
                                        <div className="text-sm">{item.dish.description} </div>
                                        {item.note && (
                                            <div className="text-red-500 text-sm mt-1">
                                                - {item.note}
                                            </div>
                                        )}
                                    </div>
                                </li>
                            ))
                        ) : (
                            <p className="text-white-500 text-center px-10 mt-20" style={{ fontSize: "24px", fontWeight: "bold" }}>There are no dishes in the order</p>
                        )}
                    </ul>
                </div>
            );
        });
    }, [orders]);

    return <div className="flex flex-wrap justify-center">{orderList}</div>;
};

export default OrderCard;
