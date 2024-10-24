import { Button, Form, Modal } from "react-bootstrap";
import paymentImage from "../../../assets/request_payment.svg";
import axios from "axios";
import React, { useState } from "react";
import '../CustomModel.css';
import '../Home.css';

const PaymentRequest = () => {
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [selectedPayment, setSelectedPayment] = useState('');

    const handlePaymentChange = (event) => {
        setSelectedPayment(event.target.value);
    };

    const handleClosePaymentModal = () => {
        setShowPaymentModal(false);
    };

    const handleSubmitPayment = () => {
        const idOrder = localStorage.getItem('IdOrder');

        if (!idOrder) {
            localStorage.setItem('paymentMethod', selectedPayment);
            handleClosePaymentModal();
        }

        if (selectedPayment) {

            axios.patch(`http://localhost:8080/api/v1/orders/${idOrder}/payment?payment=${selectedPayment}`)
                .then(response => {
                    // alert('Phương thức thanh toán đã được cập nhật thành công!');
                    setShowPaymentModal(false);
                    localStorage.setItem('paymentMethod', selectedPayment);
                })
                .catch(error => {
                    console.error('Lỗi khi cập nhật phương thức thanh toán:', error);
                    alert('Có lỗi xảy ra khi cập nhật phương thức thanh toán.');
                });
        } else {
            alert('Vui lòng chọn một phương thức thanh toán trước khi gửi.');
        }
    };

    // Hiển thị modal thanh toán
    const handleShowPaymentModal = () => setShowPaymentModal(true);

    return (
        <>
            <div className="action-item">
                <button className="action-button" onClick={handleShowPaymentModal}>
                    <img src={paymentImage} alt="Payment Icon" className="action-icon" />
                    <span className="action-text">Request Bill</span>
                </button>
            </div>

            <Modal show={showPaymentModal} onHide={handleClosePaymentModal} dialogClassName="custom-payment-modal">
                <Modal.Header>
                    <Modal.Title>Request bill</Modal.Title>
                    <div className="title">
                        <p>How would you like to pay?</p>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <div
                            className={`payment-option ${selectedPayment === 'Cash' ? 'selected' : ''}`}
                            onClick={() => setSelectedPayment('Cash')}
                        >
                            <Form.Check
                                type="radio"
                                label="Cash"
                                name="payment"
                                value="Cash"
                                checked={selectedPayment === 'Cash'}
                                onChange={handlePaymentChange}
                            />
                        </div>

                        <div
                            className={`payment-option ${selectedPayment === 'Credit_card' ? 'selected' : ''}`}
                            onClick={() => setSelectedPayment('Credit_card')}
                        >
                            <Form.Check
                                type="radio"
                                label="Credit card"
                                name="payment"
                                value="Credit_card"
                                checked={selectedPayment === 'Credit_card'}
                                onChange={handlePaymentChange}
                            />
                        </div>

                        <div
                            className={`payment-option ${selectedPayment === 'Bank_transfer' ? 'selected' : ''}`}
                            onClick={() => setSelectedPayment('Bank_transfer')}
                        >
                            <Form.Check
                                type="radio"
                                label="Bank transfer"
                                name="payment"
                                value="Bank_transfer"
                                checked={selectedPayment === 'Bank_transfer'}
                                onChange={handlePaymentChange}
                            />
                        </div>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="submit-button" onClick={handleSubmitPayment}>
                        Send request
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default PaymentRequest;
