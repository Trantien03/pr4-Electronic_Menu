import React from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentPage = () => {
    const navigate = useNavigate();

    const handleConfirmPaymentMethod = () => {
        // Xác nhận phương thức thanh toán thành công (thay thế logic của bạn ở đây)
        navigate('/checkout'); // Chuyển hướng đến trang CheckoutForm
    };

    return (
        <div>
            <h2>Payment Method</h2>
            {/* Giả sử có một nút để xác nhận phương thức thanh toán */}
            <button onClick={handleConfirmPaymentMethod}>Confirm Payment Method</button>
        </div>
    );
};

export default PaymentPage;
