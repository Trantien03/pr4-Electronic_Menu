import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import CreateRestaurantForm from '../AdminComponent/CreateRestaurantForm/CreateRestaurantForm';
import Admin from '../AdminComponent/Admin/Admin';

const AdminRoute = () => {
    const token = localStorage.getItem('token');
    const userRole = JSON.parse(localStorage.getItem('role'));

    const isAdmin = Array.isArray(userRole) && userRole.some(role => role.name === "ADMIN");

    if (!token || !isAdmin) {
        return <Navigate to="/" />;
    }

    return (
        <div>
            <Routes>
                <Route path='/*' element={<Admin />} />
            </Routes>
        </div>
    );
};

export default AdminRoute;
