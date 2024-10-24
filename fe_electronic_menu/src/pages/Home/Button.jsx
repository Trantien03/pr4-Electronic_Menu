import { Button, Form, Modal } from "react-bootstrap";
import rateImage from "../../assets/rate.svg";
import React, { useState } from "react";

import ServiceRequest from "./btn/ServiceRequest";
import PaymentRequest from "./btn/PaymentRequest";
import FeedbackRequest from "./btn/FeedbackRequest";

const ButtonHome = () => {
    const [show, setShow] = useState(false);
    const [rating, setRating] = useState(0);
    const [feedbackReasons, setFeedbackReasons] = useState([]);
    const [phone, setPhone] = useState('');
    const [comment, setComment] = useState('');

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const handleRating = (rate) => {
        setRating(rate);
    };

    const handleFeedbackReason = (reason) => {
        setFeedbackReasons(prev =>
            prev.includes(reason)
                ? prev.filter(r => r !== reason)
                : [...prev, reason]
        );
    };

    const handleSubmit = () => {
        console.log({
            rating,
            feedbackReasons,
            phone,
            comment,
        });
        handleClose();
    };

    return (
        <>
            <div className="flex justify-around mt-4">
                <PaymentRequest />
                <ServiceRequest />
                <FeedbackRequest onClick={handleShow} />
            </div>

            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title className="flex items-center">
                        <img src={rateImage} alt="Rate" className="w-8 h-8 mr-2" />
                        Feedback
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formPhone">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control
                                type="tel"
                                placeholder="Enter your phone number"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </Form.Group>
                        <Form.Group controlId="formComment" className="mt-3">
                            <Form.Label>Comment</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Enter your comments here"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                className="border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </Form.Group>
                        <Form.Group controlId="formRating" className="mt-3">
                            <Form.Label>Rate Us</Form.Label>
                            <div className="flex space-x-2">
                                {[1, 2, 3, 4, 5].map((rate) => (
                                    <Button
                                        key={rate}
                                        variant={rating === rate ? "primary" : "outline-primary"}
                                        onClick={() => handleRating(rate)}
                                    >
                                        {rate}
                                    </Button>
                                ))}
                            </div>
                        </Form.Group>
                        <Form.Group controlId="formFeedbackReasons" className="mt-3">
                            <Form.Label>Feedback Reasons</Form.Label>
                            {['Quality', 'Service', 'Price', 'Other'].map((reason) => (
                                <div key={reason} className="flex items-center">
                                    <Form.Check
                                        type="checkbox"
                                        label={reason}
                                        checked={feedbackReasons.includes(reason)}
                                        onChange={() => handleFeedbackReason(reason)}
                                        className="ml-2"
                                    />
                                </div>
                            ))}
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ButtonHome;
