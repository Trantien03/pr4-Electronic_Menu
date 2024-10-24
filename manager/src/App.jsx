import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminRoute from './Routers/AdminRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginForm from './Auth/Login';
import ChefRoute from "./Routers/ChefRoute";
import EmployeeRouter from "./Routers/EmployeeRouter.jsx";

const App = () => {
    return (
        <div>
            <ToastContainer />
            <Routes>
                <Route path='/' element={<LoginForm />} />
                <Route path='/admin/restaurants/*' element={<AdminRoute />} />
                <Route path='/chef/*' element={<ChefRoute />} />
                <Route path='/employee/*' element={<EmployeeRouter />} />
            </Routes>
        </div>
    );
};

export default App;
