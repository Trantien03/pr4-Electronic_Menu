import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const OrderSuccess = () => {
  const { id } = useParams(); // Lấy orderId từ URL
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Gọi API để lấy thông tin đơn hàng
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/orders/${id}`);
        if (!response.ok) throw new Error('Failed to fetch order details');
        const data = await response.json();
        setOrder(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!order) return <div className="alert alert-warning">Order not found</div>;

  return (
    <div className="container mt-5">
      <h1 className="text-success text-center">Thank you for your order!</h1>
      <h3 className="mt-4">Order Details</h3>
      <div className="card p-4">
        <p><strong>Order ID:</strong> {order.id}</p>
        <p><strong>Customer:</strong> {order.customer}</p>
        <p><strong>Bill Number:</strong> {order.billNumber}</p>
        <p><strong>Restaurant Table:</strong> {order.restaurantTable?.name}</p>
        <p><strong>Total Price:</strong> {order.totalPrice} VND</p>
        <p><strong>Payment Method:</strong> {order.payment}</p>
        <p><strong>Status:</strong> {order.status}</p>

        <h3 className="mt-4">Items</h3>
        <table className="table table-bordered mt-2">
          <thead className="thead-light">
            <tr>
              <th>Item Name</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {order.orderItems.map(item => (
              <tr key={item.id}>
                <td>{item.productName}</td>
                <td>{item.quantity}</td>
                <td>{item.price} VND</td>
              </tr>
            ))}
          </tbody>
        </table>

        <p className="font-weight-bold">Total Price: {order.totalPrice} VND</p>
      </div>
    </div>
  );
};

export default OrderSuccess;
