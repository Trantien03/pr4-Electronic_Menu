import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import ListOrders from "../ChefComponent/orders/ListOrders.jsx";
import Chef from "../ChefComponent/chef/Chef.jsx";

const ChefRoute = () => {
    const token = localStorage.getItem('token');
    const userRole = JSON.parse(localStorage.getItem('role'));

    const isAdmin = Array.isArray(userRole) && userRole.some(role => role.name === "CHEF");

    if (!token || !isAdmin) {
        return <Navigate to="/" />;
    }
    return (
        <div>
            <Routes>
                {/* Các route dành cho chef */}

                <Route path='/*' element={<Chef />} />
            </Routes>
        </div>
    );
};

export default ChefRoute;
