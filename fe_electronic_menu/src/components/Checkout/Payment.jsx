// components/Checkout/Payment.jsx
import React, { useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js'; // Sửa lại import cho đúng
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe('pk_test_51Q9qEwENKNaRNMvgmks8CGh9XBSKYSEEgytF9z7zOQcFae2LK0WWSeUzXOp75FvS5b92G1x1XTWAg1nS0vIWpX7G00ClezosaV');

const Payment = () => {
    const [paymentStatus, setPaymentStatus] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    const handlePaymentSuccess = () => {
        setPaymentStatus('Payment successful!');
        setErrorMessage('');
    };

    const handlePaymentError = (message) => {
        setPaymentStatus(null);
        setErrorMessage(message);
    };

    return (
        <Elements stripe={stripePromise}>
            <div>
                <h2>Payment</h2>
                {paymentStatus && <div>{paymentStatus}</div>}
                {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
                <CheckoutForm onPaymentSuccess={handlePaymentSuccess} onPaymentError={handlePaymentError} />
            </div>
        </Elements>
    );
};

export default Payment;
