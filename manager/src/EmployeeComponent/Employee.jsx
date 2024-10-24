import React from 'react';

import { Routes, Route } from 'react-router-dom';
import NewOrder from "./employee/NewOrder.jsx";
import NotificationList from "./notification/NotificationList.jsx";
import EmployeeSideBar from "./EmployeeNavbar.jsx";
import {UserProvider} from "../AdminComponent/Auth/UserContext.jsx";
import Orders from './employee/ListOrder/Orders.jsx';
import Tables from './employee/ListTable/Tables.jsx';
import Events from './employee/ListEvent/Events.jsx';

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
                        <Route path='/orders' element={<Orders />} />
                        <Route path='/tables' element={<Tables />} />
                        <Route path='/events' element={<Events />} />

                        


                    </Routes>
                </div>
            </div>
        </UserProvider>
    );
}

export default Employee;
