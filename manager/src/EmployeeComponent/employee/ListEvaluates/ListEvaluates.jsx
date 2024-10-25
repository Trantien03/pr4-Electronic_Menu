import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ListEvaluates = () => {
    const [evaluates, setEvaluates] = useState([]);
    const [error, setError] = useState(null); // Để lưu thông báo lỗi
    const [message, setMessage] = useState(null); // Để lưu thông báo thành công
    const [tableId, setTableId] = useState(1); // ID của bàn cụ thể mà bạn muốn lấy đánh giá

    // Fetch all evaluations from the API
    useEffect(() => {
        const fetchEvaluates = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/v1/evaluates');
                setEvaluates(response.data); // Lưu dữ liệu vào state
            } catch (error) {
                console.error('Error fetching evaluates:', error);
                setError('Failed to fetch evaluations.'); // Lưu thông báo lỗi
            }
        };

        fetchEvaluates();
    }, []);

    const handleAddEvaluate = async (newEvaluate) => {
        try {
            const response = await axios.post('http://localhost:8080/api/v1/evaluates', {
                ...newEvaluate,
                restaurantTable: { id: tableId }, // Chuyển ID bàn vào
            });
            setEvaluates([...evaluates, response.data]); // Cập nhật danh sách đánh giá
            setMessage('Evaluate added successfully!'); // Thông báo thành công
        } catch (error) {
            console.error('Error adding evaluate:', error);
            setError('Failed to add evaluate.'); // Thông báo lỗi
        }
    };

    // Hàm để xóa đánh giá khỏi cơ sở dữ liệu
    const deleteEvaluate = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/v1/evaluates/${id}`);
            setEvaluates((prevEvaluates) => 
                prevEvaluates.filter(evaluate => evaluate.id !== id) // Cập nhật danh sách đánh giá
            );
            setMessage('Evaluate deleted successfully!'); // Thông báo thành công
        } catch (error) {
            console.error('Error deleting evaluate:', error);
            setError('Failed to delete evaluate.'); // Thông báo lỗi
        }
    };

    return (
        <div className="container mx-auto py-8 px-6">
            <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">Danh sách đánh giá từ khách hàng</h1>

            {error && <p className="text-red-500">{error}</p>}
            {message && <p className="text-green-500">{message}</p>}

            {evaluates.length === 0 ? (
                <p className="text-center text-gray-500">Chưa có đánh giá nào.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {evaluates.map((evaluate) => (
                        <div 
                            key={evaluate.id} 
                            className="bg-white rounded-xl shadow-lg p-6 flex flex-col justify-between border border-gray-200 hover:shadow-xl transition-shadow duration-300"
                        >
                            <div className="flex items-center mb-4">
                                <div className="mr-4">
                                    <div className="text-yellow-400 text-xl">
                                        {Array.from({ length: evaluate.rating }).map((_, idx) => (
                                            <span key={idx}>★</span>
                                        ))}
                                        {Array.from({ length: 5 - evaluate.rating }).map((_, idx) => (
                                            <span key={idx} className="text-gray-300">★</span>
                                        ))}
                                    </div>
                                    <p className="text-gray-600 text-sm mt-1">({evaluate.rating}/5)</p>
                                </div>
                                <p className="text-gray-700 font-semibold">{evaluate.phone}</p>
                            </div>

                            <p className="text-gray-600 italic mb-4">{evaluate.description}</p>

                            {evaluate.feedbackReasons && evaluate.feedbackReasons.length > 0 && (
                                <div className="mt-4">
                                    <h3 className="text-sm font-semibold text-gray-700">Lý do chưa hài lòng:</h3>
                                    <ul className="list-disc pl-5 mt-2 text-sm text-gray-600 space-y-1">
                                        {evaluate.feedbackReasons.map((reason, idx) => (
                                            <li key={idx} className="text-gray-600">{reason}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            <button
                                onClick={() => deleteEvaluate(evaluate.id)}
                                className="mt-4 px-4 py-1 text-white bg-red-500 rounded hover:bg-red-600"
                            >
                                Xóa đánh giá
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ListEvaluates;
