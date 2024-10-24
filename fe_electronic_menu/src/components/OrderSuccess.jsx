// src/components/OrderSuccess.js

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const OrderSuccess = () => {
    const { orderId } = useParams();
    const [orderDetails, setOrderDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/v1/orders/${orderId}`); // API lấy thông tin đơn hàng
                setOrderDetails(response.data);
            } catch (err) {
                setError('Failed to fetch order details.');
            } finally {
                setLoading(false);
            }
        };

        fetchOrderDetails();
    }, [orderId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="order-success">
            <h1>Order Success!</h1>
            <h2>Order ID: {orderDetails.id}</h2>
            <p>Bill Number: {orderDetails.billNumber}</p>
            <p>Customer Name: {orderDetails.nameCustomer}</p>
            <p>Table: {orderDetails.table}</p>
            <p>Created At: {new Date(orderDetails.createAt).toLocaleString()}</p>
            <h3>Order Items:</h3>
            <ul>
                {orderDetails.items.map(item => (
                    <li key={item.id}>
                        {item.dish} - Quantity: {item.quantity} - Price: {item.price}
                    </li>
                ))}
            </ul>
            <h3>Total Price: {orderDetails.totalPrice}</h3>
            <h3>Status: {orderDetails.status}</h3>
            {orderDetails.coupon && <p>Coupon Discount: {orderDetails.coupon}</p>}
        </div>
    );
};

export default OrderSuccess;
