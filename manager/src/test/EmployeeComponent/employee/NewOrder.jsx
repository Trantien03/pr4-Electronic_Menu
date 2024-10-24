import React, { useEffect, useState } from "react";
import { addItemToOrder, handleQuantityChange, fetchDishes, createOrder } from "./orderUtils";
import OrderedItems from "./OrderedItems";
import FoodList from "./FoodList";
import { useNavigate } from "react-router-dom";

const NewOrder = () => {
  const [orderedItems, setOrderedItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [foodList, setFoodList] = useState([]);

  const [orderRequest, setOrderRequest] = useState({
    customer: "Khách lẻ",
    type: "Take_away",
    coupon: "10%",
    payment: "Cash",
    originalPrice: 0,
    totalDiscount: 0,
    totalPrice: 0,
    orderItems: [],
  });

  const handleSubmit = async () => {
    try {
      console.log("orderItem"+ orderedItems)
      const createdOrder = await createOrder(orderRequest);
      console.log("Order created:", createdOrder);
      setOrderedItems([]);
      setTotalAmount(0);
      setOrderRequest({
        customer: "Khách lẻ",
        type: "Take_away",
        coupon: "10%",
        payment: "Cash",
        originalPrice: 0,
        totalDiscount: 0,
        totalPrice: 0,
        orderItems: [],
      });

      // Xóa hoặc cập nhật lại giá trị trong localStorage
      localStorage.removeItem("orderedItems");

      // Hiển thị thông báo thành công (nếu cần)
      alert("Đơn hàng đã được tạo thành công!");
    } catch (error) {
      console.error("Failed to create order:", error);
    }
  };

  useEffect(() => {
    localStorage.setItem("orderedItems", JSON.stringify(orderedItems));
  }, [orderedItems]);

  useEffect(() => {
    const storedItems = localStorage.getItem("orderedItems");
    if (storedItems) {
      setOrderedItems(JSON.parse(storedItems));
    }
  }, []);

  useEffect(() => {
    const loadDishes = async () => {
      const dishes = await fetchDishes();
      setFoodList(dishes);
    };

    loadDishes();
  }, []);

  useEffect(() => {
    const originalPrice = orderedItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    const totalDiscount = orderedItems.reduce(
        (sum, item) =>
            sum +
            (item.discount
                ? (item.price * parseFloat(item.discount)) / 100 * item.quantity
                : 0),
        0
    );

    const totalPrice = originalPrice - totalDiscount;

    setOrderRequest((prevRequest) => ({
      ...prevRequest,
      originalPrice,
      totalDiscount,
      totalPrice,
      orderItems: orderedItems.map((item) => ({
        dish_id: item.id,
        quantity: item.quantity,
      })),
    }));
  }, [orderedItems]);

  const addItem = (item) => {
    const discountPercentage = item.discount;
    const discountedPrice = item.price * (1 - discountPercentage / 100);

    setOrderedItems((prevOrderedItems) =>
        addItemToOrder(prevOrderedItems, {
          ...item,
          price: discountedPrice,
        })
    );

    setTotalAmount((prevTotal) => prevTotal + discountedPrice);
  };

  const handleQuantityChangeInOrder = (id, quantity) => {
    setOrderedItems((prevOrderedItems) =>
        handleQuantityChange(prevOrderedItems, id, quantity)
    );
  };

  return (
      <div className="p-4 bg-white">
        <div className="flex">
          <OrderedItems
              orderedItems={orderedItems}
              totalAmount={totalAmount}
              handleQuantityChangeInOrder={handleQuantityChangeInOrder}
              onSubmit={handleSubmit}
          />
          <FoodList foodList={foodList} addItem={addItem} />
        </div>
      </div>
  );
};

export default NewOrder;
