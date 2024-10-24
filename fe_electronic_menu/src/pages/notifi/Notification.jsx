import CustomNavbar from "./Navbar";
import DishesItem from "./DishesItem.jsx";
import Verify from "../Verify/Verify.jsx";
import { useState } from "react";

const Notification = () => {
    const [isPaid, setIsPaid] = useState(false); // Quản lý trạng thái thanh toán

    return (
        <>
            <CustomNavbar />
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4 text-center text-orange-600">Order Notification</h1>
                
                {/* Sử dụng Flexbox để căn DishesItem và Verify trên cùng một dòng */}
                <div className="bg-white rounded-lg shadow-md p-6 flex items-start justify-between space-x-4">
                    
                    {/* Phần món ăn */}
                    <div className="w-1/2">
                        <DishesItem />
                    </div>

                    {/* Phần xác nhận thanh toán */}
                    <div className="w-1/2">
                        <div className="text-center">
                            {isPaid ? (
                                <p className="text-green-600 font-bold">Paid</p>
                            ) : (
                                <Verify />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Notification;
