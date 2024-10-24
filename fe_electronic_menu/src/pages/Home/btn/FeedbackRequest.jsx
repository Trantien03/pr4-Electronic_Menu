import { Button, Form, Modal } from "react-bootstrap";
import rateImage from "../../../assets/rate.svg";
import React, { useState } from "react";
import '../CustomModel.css';
import '../Home.css';

const FeedbackRequest = () => {
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
            <div className="action-item">
                <button className="action-button" onClick={handleShow}>
                    <img src={rateImage} alt="Rate Icon" className="action-icon" />
                    <span className="action-text">Give feedback</span>
                </button>
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>Trải nghiệm của bạn hôm nay thế nào?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="rating mb-3 flex justify-center">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <span
                                key={star}
                                onClick={() => handleRating(star)}
                                style={{
                                    cursor: 'pointer',
                                    fontSize: '40px',
                                    padding: '10px',
                                    color: star <= rating ? 'orange' : 'gray',
                                }}
                            >
                                ★
                            </span>
                        ))}
                    </div>

                    {/* Hiển thị phản hồi dựa trên đánh giá */}
                    <p className="text-center">
                        {rating === 1 ? 'Rất thất vọng' : ''}
                        {rating === 2 ? 'Thất vọng' : ''}
                        {rating === 3 ? 'Tạm ổn' : ''}
                        {rating === 4 ? 'Hài Lòng' : ''}
                        {rating === 5 ? 'Quá tuyệt vời' : ''}
                    </p>

                    {/* Hiển thị lý do chưa hài lòng nếu đánh giá không phải 5 */}
                    {rating !== 5 && (
                        <Form.Group>
                            <Form.Label>Bạn có điều gì chưa hài lòng phải không?</Form.Label>
                            <div className="feedback-reasons flex flex-wrap">
                                {[
                                    'Vệ sinh không sạch sẽ',
                                    'Nhân viên không nhiệt tình',
                                    'Món ăn không ngon',
                                    'Món ăn phục vụ lâu',
                                    'Giá không phù hợp với chất lượng',
                                    'Không gian bất tiện',
                                    'Không gian ồn'
                                ].map((reason) => (
                                    <Button
                                        key={reason}
                                        variant={feedbackReasons.includes(reason) ? 'primary' : 'outline-secondary'}
                                        onClick={() => handleFeedbackReason(reason)}
                                        style={{ margin: '5px' }}
                                    >
                                        {reason}
                                    </Button>
                                ))}
                            </div>
                        </Form.Group>
                    )}

                    <Form.Group controlId="formPhone" className="mt-3">
                        <Form.Label>Số điện thoại của bạn</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Nhập số điện thoại"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="formComment" className="mt-3">
                        <Form.Label>Chia sẻ thêm về trải nghiệm của bạn</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="Chia sẻ cho nhà hàng trải nghiệm của bạn nhé"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Đóng
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Gửi đánh giá
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default FeedbackRequest;
