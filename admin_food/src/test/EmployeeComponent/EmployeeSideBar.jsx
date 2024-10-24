import React from "react";
import { Link } from "react-router-dom"; // Sử dụng Link từ react-router-dom
import './Sidebar.css'
export const EmployeeSideBar = ({ handleClose }) => {
    return (
        <nav className="bg-white p-4 shadow-md">
            <div className="flex space-x-4">
                <Link to="/employee" className="bg-blue-500 text-white px-5 py-3 rounded-lg transition duration-300 ease-in-out hover:bg-blue-400 font-semibold">
                    C
                </Link>
                <Link to="/employee/notification" className="bg-green-500 text-white px-5 py-3 rounded-lg transition duration-300 ease-in-out hover:bg-green-400 font-semibold">
                    Q
                </Link>
                <button className="bg-purple-500 text-white px-5 py-3 rounded-lg transition duration-300 ease-in-out hover:bg-purple-400 font-semibold">
                    Khách hàng
                </button>
                <button className="bg-blue-600 text-white px-5 py-3 rounded-lg transition duration-300 ease-in-out hover:bg-blue-500 font-semibold">
                    1 Khách
                </button>
                <button className="bg-yellow-500 text-white px-5 py-3 rounded-lg transition duration-300 ease-in-out hover:bg-yellow-400 font-semibold">
                    Shop 12
                </button>
            </div>
        </nav>
    );
}

export default EmployeeSideBar;
