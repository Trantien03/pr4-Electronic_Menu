import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate, useSearchParams } from 'react-router-dom';
import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder';
import WelcomeForm from './pages/Welcome/WelcomeForm';
import Menu from './pages/Menu/Menu';
import Notification from './pages/notifi/Notification.jsx';
import axios from 'axios';
import OrderSuccess from './components/OrderSuccess.jsx';

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [userName, setUserName] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const [searchParams] = useSearchParams(); // Lấy searchParams từ URL

  // Kiểm tra localStorage để xem tên người dùng đã được lưu chưa
  useEffect(() => {
    const savedName = localStorage.getItem('username');
    if (savedName) {
      setUserName(savedName);
    }
  }, []);

  // Kiểm tra bàn từ URL hoặc localStorage khi component mount
  useEffect(() => {
    const tableId = searchParams.get('table_id') || localStorage.getItem('table_id'); // Lấy ID bàn từ URL hoặc localStorage
    const tableName = searchParams.get('table_name') || localStorage.getItem('table_name'); // Lấy tên bàn từ URL hoặc localStorage

    if (!tableId || !tableName) {
      setErrorMessage('Thông tin bàn không hợp lệ.'); // Thông báo lỗi nếu không tìm thấy
      navigate('/'); // Điều hướng về trang chính
      return;
    }

    // Gọi API để lấy danh sách bàn
    const fetchTables = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/restaurantTables'); // Địa chỉ API của bạn
        const tables = response.data;

        // Kiểm tra xem bàn có tồn tại không
        const table = tables.find((table) => table.id === Number(tableId) && table.nameTable === tableName);
        if (!table) {
          setErrorMessage('Bàn không tồn tại hoặc thông tin không khớp.'); // Thông báo lỗi nếu không tìm thấy
          navigate('/'); // Điều hướng về trang chính
        } else {
          setErrorMessage(''); // Nếu tìm thấy, xóa thông báo lỗi
        }
      } catch (error) {
        console.error('Error fetching tables:', error);
        setErrorMessage('Có lỗi xảy ra khi tải dữ liệu bàn.');
        navigate('/'); // Điều hướng về trang chính nếu có lỗi
      }
    };

    fetchTables();
  }, [searchParams, navigate]);

  // Hàm này sẽ được gọi khi người dùng nhập tên vào WelcomeForm
  const handleNameSubmit = (name) => {
    localStorage.setItem('username', name);
    setUserName(name); // Cập nhật state để hiển thị trang chính
  };

  // Hàm để cập nhật thông tin bàn và URL
  const handleTableSelect = (tableId, tableName) => {
    // Cập nhật URL
    navigate(`/?table_id=${tableId}&table_name=${tableName}`);

    // Lưu thông tin bàn vào localStorage
    localStorage.setItem('table_id', tableId);
    localStorage.setItem('table_name', tableName);
  };

  return (
    <>
      {!userName ? (
        <WelcomeForm onSubmitName={handleNameSubmit} />
      ) : (
        <div className="app">
          <Routes>
            <Route path="/" element={<Home onTableSelect={handleTableSelect} />} /> {/* Giả sử Home có prop để chọn bàn */}
            <Route path="/menu" element={<Menu />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/order" element={<PlaceOrder />} />
            <Route path="/notification" element={<Notification />} />
            <Route path="/order/success/:orderId" component={OrderSuccess} />


          </Routes>
          {/* Hiển thị thông báo lỗi nếu có */}
          {errorMessage && <div className="error-message">{errorMessage}</div>}
        </div>
      )}
    </>
  );
};

export default App;
