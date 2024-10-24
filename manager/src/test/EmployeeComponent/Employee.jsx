import React from 'react';

import { Routes, Route } from 'react-router-dom';
import NewOrder from "./employee/NewOrder.jsx";
import NotificationList from "./notification/NotificationList.jsx";
import EmployeeSideBar from "./EmployeeSideBar.jsx";
import {UserProvider} from "../AdminComponent/Auth/UserContext.jsx";

const Employee = () => {
    const handleClose = () => {
        // Thêm logic đóng sidebar nếu cần
    };

    return (
        <UserProvider>
            <div className="flex flex-col h-screen">
                <div className="h-[9%]">
                    <EmployeeSideBar handleClose={handleClose} />
                </div>

                <div className="flex-1 ">
                    <Routes>
                        <Route path='/' element={<NewOrder />} />
                        <Route path='/notification' element={<NotificationList />} />
                    </Routes>
                </div>
            </div>
        </UserProvider>
    );
}

export default Employee;
