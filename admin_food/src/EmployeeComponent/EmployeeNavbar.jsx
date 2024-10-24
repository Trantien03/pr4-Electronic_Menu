import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaSignOutAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import axios from "axios";

// Định nghĩa action 'logout'
const logout = () => ({
  type: "LOGOUT",
});

export const EmployeeSideBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [hasNewRequest, setHasNewRequest] = useState(false); // State kiểm tra có yêu cầu mới

  useEffect(() => {
    const checkNewRequests = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/v1/notifications");
        const notifications = response.data;
        const newRequests = notifications.some(notification => !notification.isRead); // Kiểm tra yêu cầu mới
        setHasNewRequest(newRequests); // Cập nhật state
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    checkNewRequests();
  }, []);

  // Hàm xử lý khi click vào nút Logout
  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="bg-white p-3 shadow-md">
      <div className="flex justify-between items-center">
        <div className="flex justify-center items-center space-x-4 flex-grow">
          <Link
            to="/employee"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg transition duration-300 ease-in-out hover:bg-blue-400 font-semibold"
          >
            Create Order
          </Link>

          <Link
            to="/employee/notification"
            className="relative bg-green-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition duration-300 ease-in-out hover:bg-green-400 font-semibold"
          >
            <FaEnvelope /> {/* Icon lá thư */}
            <span>Notifications</span>
            {/* Hiển thị chấm đỏ nếu có yêu cầu mới */}
            {hasNewRequest && (
              <span className="absolute top-0 right-0 block h-3 w-3 rounded-full bg-red-600 ring-2 ring-white"></span>
            )}
          </Link>

          <Link 
          to="/employee/orders"
          className="bg-yellow-500 text-white px-4 py-2 rounded-lg transition duration-300 ease-in-out hover:bg-yellow-400 font-semibold"
          >
          List Order
          </Link>

          <Link
          to="/employee/tables"
           className="bg-blue-600 text-white px-4 py-2 rounded-lg transition duration-300 ease-in-out hover:bg-blue-500 font-semibold">
            List Tables
          </Link>

          <Link 
          to="/employee/events"
          className="bg-red-500 text-white px-4 py-2 rounded-lg transition duration-300 ease-in-out hover:bg-red-400 font-semibold">
            List Event
          </Link>
        </div>

        <div
          onClick={handleLogout}
          className="bg-gray-500 text-white p-3 rounded-full cursor-pointer transition duration-300 ease-in-out hover:bg-gray-400"
        >
          <FaSignOutAlt />
        </div>
      </div>
    </nav>
  );
};

export default EmployeeSideBar;
