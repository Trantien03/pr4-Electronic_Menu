import React from 'react';

import { Routes, Route } from 'react-router-dom';



import ListOrders from '../orders/ListOrders.jsx';

import ChefSideBar from "./ChefSideBar.jsx";
import {UserProvider} from "../../AdminComponent/Auth/UserContext.jsx";
import Menu from "../../AdminComponent/Menu/Menu.jsx";
import FoodCategory from "../../AdminComponent/FoodCategory/FoodCategory.jsx";

const Chef = () => {
    const handleClose = () => {
        // Thêm logic đóng sidebar nếu cần
    };

    return (
         <UserProvider>
            <div>
                <div className='lg:flex justify-between'>
                    <div>
                        <ChefSideBar handleClose={handleClose} />
                    </div>
                    <div className='lg:w-[80%]'>
                        <Routes>
                            <Route path='/orders' element={<ListOrders />} />
                            <Route path='/menu' element={<Menu />} />
                            <Route path='/category' element={<FoodCategory />} />
                        </Routes>
                    </div>
                </div>
            </div>
         </UserProvider>
    );
}

export default Chef;
