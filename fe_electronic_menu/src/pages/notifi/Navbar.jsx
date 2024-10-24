import React, { useEffect, useState, useContext } from 'react';
import { Navbar, Container } from 'react-bootstrap';
import { Link, useNavigate, useSearchParams } from 'react-router-dom'; 
import axios from 'axios';
import { StoreContext } from '../../context/StoreContext.jsx';
import { getTableFromUrl } from '../../components/Service/TableService';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import CircularProgress from '@mui/material/CircularProgress'; // Thêm import cho CircularProgress

const CustomNavbar = () => {
    const { url } = useContext(StoreContext);
    const [orderStatus, setOrderStatus] = useState('');
    const [status, setStatus] = useState('');
    const [searchParams] = useSearchParams();
    const { tableId, tableName } = getTableFromUrl(searchParams);
    const [loading, setLoading] = useState(false); // State để điều khiển loading
    const [showSuccess, setShowSuccess] = useState(false); // State để điều khiển thông báo thành công
    const navigate = useNavigate();

    // Fetch order status by orderId
    const fetchOrderStatusById = async (orderId) => {
        try {
            setLoading(true); // Bắt đầu loading
            const response = await axios.get(`${url}/api/v1/orders/${orderId}`);
            setOrderStatus(response.data.status);
            setLoading(false); // Kết thúc loading
        } catch (error) {
            console.error('Error fetching order status:', error);
            setLoading(false); // Kết thúc loading ngay cả khi có lỗi
        }
    };

    useEffect(() => {
        const orderId = localStorage.getItem('IdOrder');
        if (orderId) {
            fetchOrderStatusById(orderId);
        } else {
            console.warn('No order ID found in localStorage.');
        }
    }, []);

    const checkStatus = () => {
        if (orderStatus === "Paid") {
            setStatus("Paid");
            setShowSuccess(true); // Hiển thị thông báo thành công
        } else if (orderStatus === "PendingPayment") {
            setStatus("Confirmed, awaiting payment");
        }  else if (orderStatus === "Pending") {
            setStatus("Pending");
        } else {
            setStatus("Trạng thái không xác định");
        }
    };

    useEffect(() => {
        if (orderStatus) {
            checkStatus();
        }
    }, [orderStatus]);

    return (
        <>
            <Navbar className="bg-white shadow-md" expand="lg">
                <Container>
                    <Navbar.Brand className="flex flex-col items-start">
                        <div className="flex items-center">
                            <Link to={`/?table_id=${tableId}&table_name=${tableName}`} className="flex items-center text-orange-500 hover:text-orange-600 transition-colors">
                                <HomeRoundedIcon />
                            </Link>
                            <span className="ml-3 text-lg font-semibold">
                                Dishes ordered (
                                <span
                                    className={`font-bold ${status === "Paid" ? "text-green-600" : status === "Pending" ? "text-orange-600" : "text-red-600"}`}
                                >
                                    {loading ? (
                                        <CircularProgress size={24} /> // Hiển thị icon loading khi đang tải
                                    ) : (
                                        status
                                    )}
                                </span>
                                )
                            </span>
                        </div>
                    </Navbar.Brand>
                </Container>
            </Navbar>

            {/* Thông báo thanh toán thành công */}
            {showSuccess && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="absolute inset-0 bg-black opacity-50" onClick={() => setShowSuccess(false)}></div>
                    <div className="bg-white rounded-lg shadow-lg p-6 z-10 text-center">
                        <h1 className="text-lg font-semibold mb-4">Payment successful!</h1>
                        <p className="text-gray-700">Thank you for coming and using our services!</p>
                        <button
                            className="mt-4 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
                            onClick={() => {
                                setShowSuccess(false); // Đóng thông báo
                                navigate('/'); // Điều hướng về trang chủ
                            }} // Đóng thông báo và điều hướng về trang chủ
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default CustomNavbar;
