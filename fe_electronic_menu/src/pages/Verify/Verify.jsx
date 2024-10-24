import React, { useContext, useState, useEffect } from "react";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import EventList from "../notifi/EventList";

const Verify = () => {
    const [searchParams] = useSearchParams();
    const success = searchParams.get("success");
    const orderId = searchParams.get("orderId");
    const { url } = useContext(StoreContext);
    const navigate = useNavigate();
    
    const [isProcessing, setIsProcessing] = useState(false);

    const handlePayment = async () => {
        setIsProcessing(true); // Hiển thị trạng thái đang xử lý thanh toán
        const orderId = localStorage.getItem("IdOrder");
        const paymentMethod = "Bank_transfer"; // Đặt phương thức thanh toán là "Bank transfer"
    
        try {
            const paymentUrl = `${url}/api/v1/payments/order/${orderId}`;
            console.log("Calling payment API at:", paymentUrl);
    
            // Gửi yêu cầu tạo phiên thanh toán với phương thức ngân hàng
            const response = await axios.post(paymentUrl, { paymentMethod });
    
            console.log("Response from API:", response.data);
    
            const redirectUrl = response.data; // Không cần tìm trong object, lấy trực tiếp
            if (redirectUrl) {
                console.log("Redirecting to payment URL:", redirectUrl);
                window.location.href = redirectUrl; // Chuyển hướng đến URL thanh toán
            } else {
                console.error("Redirect URL is missing in the response.");
                alert("Không thể chuyển hướng đến trang thanh toán.");
            }
        } catch (error) {
            console.error("Error creating payment session:", error);
            alert("Đã xảy ra lỗi. Vui lòng thử lại.");
        } finally {
            setIsProcessing(false);
        }
    };

    useEffect(() => {
        if (orderId) {
            handlePayment(); // Tự động xử lý thanh toán nếu có orderId
        }
    }, [orderId]);

    return (
        <div className="verify flex items-center justify-center min-h-[vh] bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full">
                <EventList />

                {/* Nút xác nhận thanh toán */}
                <div className="text-center">
                    <button
                        className={`w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 ${
                            isProcessing ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                        onClick={handlePayment}
                        disabled={isProcessing} // Vô hiệu hóa khi đang xử lý
                    >
                        {isProcessing ? "Processing..." : "Confirm Payment"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Verify;
