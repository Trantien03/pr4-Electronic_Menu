import React, { useState } from 'react';
import { useMediaQuery, Drawer, Divider, IconButton } from '@mui/material';
import { ShoppingBag, Logout } from '@mui/icons-material';
import ShopTwoIcon from '@mui/icons-material/ShopTwo';
import CategoryIcon from '@mui/icons-material/Category';
import NotesIcon from '@mui/icons-material/Notes'; // Thêm NotesIcon
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { orange } from '@mui/material/colors';
 // Điều chỉnh theo đường dẫn đúng

const menu = [
  { title: "Orders", icon: <ShoppingBag sx={{ color: orange[500] }} />, path: "/orders" },
  { title: "Menu", icon: <ShopTwoIcon sx={{ color: orange[500] }} />, path: "/menu" },
  { title: "Food Category", icon: <CategoryIcon sx={{ color: orange[500] }} />, path: "/category" },
];

export const ChefSideBar = ({ handleClose }) => {
  const [open, setOpen] = useState(false); // Trạng thái để kiểm soát mở/đóng Drawer
  const isSmallScreen = useMediaQuery('(max-width:1080px)');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleNavigate = (item) => {
    navigate(`/chef${item.path}`);
    if (item.title === "Logout") {
      navigate("/");
      dispatch(logout());
      handleClose();
    }
  };

  const toggleDrawer = () => {
    setOpen((prev) => !prev); // Đảo ngược trạng thái mở/đóng
  };

  return (
    <div>
      {/* Nút để mở/đóng Sidebar trên màn hình di động */}
      <IconButton onClick={toggleDrawer} sx={{ color: orange[500], display: isSmallScreen ? 'block' : 'none' }}>
        <NotesIcon />
      </IconButton>

      <Drawer
        variant={isSmallScreen ? "temporary" : "permanent"}
        onClose={() => setOpen(false)} // Đóng Drawer khi nhấp ra ngoài
        open={open}
        anchor="left"
        classes={{
          paper: 'bg-black bg-opacity-50 text-white',
        }}
      >
        <div className="w-[70vw] lg:w-[20vw] h-screen flex flex-col py-10">
          <div className="text-center text-2xl font-bold py-6 border-b border-gray-700">
            Chef Dashboard
          </div>

          <div className="flex flex-col justify-start space-y-6 mt-10 px-6">
            {menu.map((item, index) => (
              <React.Fragment key={index}>
                <div
                  onClick={() => handleNavigate(item)}
                  className="flex items-center gap-5 cursor-pointer hover:bg-orange-200 p-7 rounded-md transition duration-300 ease-in-out"
                >
                  {item.icon}
                  <span>{item.title}</span>
                </div>
                {index !== menu.length - 1 && <Divider sx={{ backgroundColor: '#4b5563' }} />}
              </React.Fragment>
            ))}
          </div>

          <div className="mt-auto mb-10 px-6">
            <div
              onClick={() => handleNavigate({ title: 'Logout' })}
              className="flex items-center gap-5 cursor-pointer text-black hover:bg-orange-200 p-7 rounded-md transition duration-300 ease-in-out"
            >
              <Logout sx={{ color: orange[500] }} />
              <span >Logout</span>
            </div>
          </div>
        </div>
      </Drawer>
    </div>
  );
}

export default ChefSideBar;
