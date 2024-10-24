import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import ListOrders from '../orders/ListOrders.jsx';
import ChefSideBar from './ChefSideBar.jsx';
import { UserProvider } from '../../AdminComponent/Auth/UserContext.jsx';
import ChefMenu from '../menu/ChefMenu.jsx';
import ChefCategory from '../category/ChefCategory.jsx';

const Chef = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false); // Trạng thái để kiểm soát sidebar
    const handleClose = () => {
        setSidebarOpen(false); // Đóng sidebar
    };

    return (
        <UserProvider>
            <div
                className="min-h-screen flex"
                style={{
                    backgroundImage: 'url(https://t3.ftcdn.net/jpg/02/60/12/88/240_F_260128861_Q2ttKHoVw2VrmvItxyCVBnEyM1852MoJ.jpg)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundAttachment: 'fixed',
                }}
            >
                {/* Overlay for readability */}
                <div className="min-h-screen w-full bg-black bg-opacity-50 flex">
                    {/* Sidebar */}
                    <div 
                        className="fixed lg:static z-50 bg-white shadow-lg h-screen lg:w-1/5" // Sidebar cố định và chiếm 1/5 màn hình
                        style={{ height: '100vh' }} // Đặt chiều cao cố định cho Sidebar
                    >
                        <ChefSideBar handleClose={handleClose} />
                    </div>

                    {/* Main content */}
                    <div className="flex-1 lg:w-4/5 p-6 text-white overflow-y-auto" style={{ height: '100vh' }}> {/* Nội dung có thể cuộn */}
                        <button 
                            className="lg:hidden p-2 bg-orange-500 text-white rounded" 
                            onClick={() => setSidebarOpen(!sidebarOpen)} // Mở/đóng sidebar
                        >
                            {sidebarOpen ? 'Close Menu' : 'Open Menu'}
                        </button>
                        <Routes>
                            <Route path="/orders" element={<ListOrders />} />
                            <Route path="/menu" element={<ChefMenu />} />
                            <Route path="/category" element={<ChefCategory />} />
                        </Routes>
                    </div>
                </div>
            </div>
        </UserProvider>
    );
};

export default Chef;
