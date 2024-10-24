import React, { useState } from "react";
import "./CheckoutForm.css"; // Nhập tệp CSS

const CheckoutForm = () => {
    const [cardNumber, setCardNumber] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    const [cvv, setCvv] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        // Xử lý việc gửi biểu mẫu
        console.log({ cardNumber, expiryDate, cvv });
    };

    return (
        <div className="checkout-form">
            <h2>Thanh toán</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Số thẻ</label>
                    <input
                        type="text"
                        placeholder="•••• •••• •••• ••••"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        maxLength="19"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Ngày hết hạn</label>
                    <input
                        type="text"
                        placeholder="MM/YY"
                        value={expiryDate}
                        onChange={(e) => setExpiryDate(e.target.value)}
                        maxLength="5"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>CVV</label>
                    <input
                        type="text"
                        placeholder="•••"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                        maxLength="3"
                        required
                    />
                </div>
                <button type="submit" className="submit-button">Thanh toán ngay</button>
            </form>
        </div>
    );
};

export default CheckoutForm;
