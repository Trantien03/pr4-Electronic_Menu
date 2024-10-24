import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import NewOrder from "../EmployeeComponent/employee/NewOrder.jsx";
import NotificationList from "../EmployeeComponent/notification/NotificationList.jsx";
import Employee from "../EmployeeComponent/Employee.jsx";

const EmployeeRouter = () => {
    const token = localStorage.getItem('token');
    const userRole = JSON.parse(localStorage.getItem('role'));

    const isAdmin = Array.isArray(userRole) && userRole.some(role => role.name === "EMPLOYEE");

    if (!token || !isAdmin) {
        return <Navigate to="/" />;
    }

    return (
        <div>
            <Routes>
                <Route path='/*' element={<Employee />} />
            </Routes>
        </div>
    );
};

export default EmployeeRouter;
