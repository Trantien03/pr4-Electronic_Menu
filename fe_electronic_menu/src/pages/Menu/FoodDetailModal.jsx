import React, { useContext, useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { StoreContext } from "../../context/StoreContext.jsx";

const FoodDetailModal = ({ id, show, onHide, food }) => {
  const { addToCart2, removeFromItem, fetchFoodList, removeAllFromCart } =
    useContext(StoreContext);

  const [quantity, setQuantity] = useState(1);
  const [note, setNote] = useState("");

  useEffect(() => {
    if (food && food.id === id) {
      setQuantity(1);
    }
  }, [food, id]);

  const fetchUpdatedFoodList = async () => {
    await fetchFoodList(); // Gọi lại hàm lấy danh sách món ăn từ API hoặc dữ liệu cục bộ
  };

  if (!food) return null;

  const { name, price, discount, image, description } = food; // Lấy description từ food
  const numericPrice = parseFloat(price) || 0;
  const numericDiscount = parseFloat(discount) || 0;
  const discountedPrice =
    numericPrice - numericPrice * (numericDiscount / 100);
  const totalPrice = (numericDiscount ? discountedPrice : numericPrice) * quantity;

  const handleRemove = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAdd = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleNoteChange = (event) => {
    setNote(event.target.value);
  };

  const handleAddToCart = () => {
    if (quantity > 0) {
      removeAllFromCart(id); // Xóa các món cũ trước khi thêm món mới với số lượng đã thay đổi
      addToCart2(id, quantity, note); // Thêm món vào giỏ hàng
      fetchUpdatedFoodList(); // Gọi lại danh sách món ăn để cập nhật giao diện
      onHide(); // Đóng modal
    }
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      dialogClassName="w-full max-w-2xl bg-white p-6 rounded-lg shadow-lg"
    >
      {/* Modal Header */}
      <Modal.Header closeButton className="border-b-0 p-4">
        <h2 className="text-2xl font-semibold text-gray-800 text-center">
          {name}
        </h2>
      </Modal.Header>

      {/* Modal Body */}
      <Modal.Body className="text-center p-4">
        <img
          className="rounded-lg mb-4 max-w-full h-auto object-cover"
          src={`http://localhost:8080/images/${image}`}
          alt={name}
        />

        {/* Note Input */}
        <textarea
          className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700"
          placeholder="Do you have any message for the restaurant?"
          value={note}
          onChange={handleNoteChange}
        ></textarea>

        {/* Description */}
        <div className="ml-8">
          <span>{description}</span> {/* Correct reference here */}
        </div>

        {/* Quantity Controls */}
        <div className="flex justify-center items-center space-x-4 mb-4">
          <button
            className="px-4 py-2 bg-gray-200 rounded-md text-gray-700 hover:bg-gray-300 disabled:opacity-50"
            onClick={handleRemove}
            disabled={quantity <= 1}
          >
            -
          </button>
          <input
            type="text"
            value={quantity}
            readOnly
            className="w-12 text-center border border-gray-300 rounded-md"
          />
          <button
            className="px-4 py-2 bg-gray-200 rounded-md text-gray-700 hover:bg-gray-300"
            onClick={handleAdd}
          >
            +
          </button>
        </div>

        {/* Add to Cart Button */}
        <Button
          className="w-full py-3 bg-orange-500 text-white text-lg rounded-md font-semibold hover:bg-orange-600"
          onClick={handleAddToCart}
          disabled={quantity === 0}
        >
          Add to cart ({totalPrice.toFixed(2)} $)
        </Button>
      </Modal.Body>
    </Modal>
  );
};

export default FoodDetailModal;
