import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import CreateEvent from './CreateEvent'; // Import CreateEvent
import DeleteIcon from '@mui/icons-material/Delete'; // Thêm biểu tượng xóa

const url = "http://localhost:8080"; // Đường dẫn API cơ bản của bạn

const ListEvents = () => {
  const [events, setEvents] = useState([]);
  const [open, setOpen] = useState(false);  // State để mở/đóng modal tạo sự kiện
  const [selectedEvent, setSelectedEvent] = useState(null);  // Sự kiện hiện tại (dùng cho chỉnh sửa)

  // Hàm fetch events từ API
  const fetchEvents = async () => {
    try {
      const response = await axios.get(`${url}/api/v1/events`);
      if (response.data && Array.isArray(response.data)) {
        setEvents(response.data);
      } else {
        toast.error("Error: No data returned or data is not an array");
      }
    } catch (error) {
      toast.error("Error fetching data");
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleCreateEvent = () => {
    setSelectedEvent(null);  // Reset selected event
    setOpen(true);  // Mở modal
  };

  const handleEditEvent = (event) => {
    setSelectedEvent(event);  // Cập nhật sự kiện đang chỉnh sửa
    setOpen(true);  // Mở modal
  };

  const handleClose = () => {
    setOpen(false);  // Đóng modal
  };

  // Hàm xử lý xóa sự kiện
  const handleDeleteEvent = async (eventId) => {
    const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa sự kiện này không?");
    if (confirmDelete) {
      try {
        const response = await axios.delete(`${url}/api/v1/events/${eventId}`);
        if (response.status === 200) {
          toast.success("Sự kiện đã được xóa thành công!");
          fetchEvents();  // Làm mới danh sách sự kiện sau khi xóa
        } else {
          toast.error("Xóa sự kiện thất bại!");
        }
      } catch (error) {
        toast.error("Xóa sự kiện thất bại. Vui lòng thử lại.");
        console.error("Error deleting event:", error);
      }
    } else {
      toast.info("Xóa sự kiện đã bị hủy.");
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {events.map((event) => (
          <div className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 relative" key={event.id}>
            <div className="p-5">
              <h5 className="text-xl font-semibold text-orange-600">{event.name || "No name available"}</h5>
              <p className="text-gray-600">Discount: <span className="font-medium">{event.discount || 0}%</span></p>
              <p className="text-gray-600">Start Date: <span className="font-medium">{new Date(event.startDay).toLocaleDateString()}</span></p>
              <p className="text-gray-600">End Date: <span className="font-medium">{new Date(event.endDay).toLocaleDateString()}</span></p>
           
              {/* Nút chỉnh sửa */}
              <button 
                onClick={() => handleEditEvent(event)} 
                className="text-red-600 mr-4 mt-3"
              >
                Edit
              </button>

              {/* Nút xóa (ở góc bên phải) */}
              <button 
                onClick={() => handleDeleteEvent(event.id)} 
                className="absolute top-2 right-2 text-red-600"
              >
                <DeleteIcon /> {/* Biểu tượng xóa */}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal CreateEvent */}
      <CreateEvent open={open} handleClose={handleClose} event={selectedEvent} refreshEvents={fetchEvents} />
    </div>
  );
};

export default ListEvents;
