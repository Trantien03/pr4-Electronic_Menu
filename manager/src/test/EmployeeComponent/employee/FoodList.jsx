// FoodList.js
import React from "react";

const FoodList = ({ foodList, addItem }) => {
    return (
        <div className="w-2/3 p-4">
            <div className="grid grid-cols-4 gap-4">
                <button className="bg-gray-200 p-2 rounded">Thêm nhanh</button>
                <button className="bg-gray-200 p-2 rounded">K.Mãi, phụ thu</button>
                <button className="bg-gray-200 p-2 rounded">Mức giá</button>
                <button className="bg-gray-200 p-2 rounded">Phổ biến</button>
            </div>
            <div className=" p-4 overflow-y-auto" style={{ maxHeight: '80vh', maxWidth: 'auto' }}>
                <div className="grid grid-cols-4 gap-4 mt-4">
                    {foodList.map((dish) => (
                        <div key={dish.id} className="text-center">
                            <img
                                src={dish.image ? `http://localhost:8080/images/${dish.image}` : "https://placehold.co/100x100"}
                                alt={dish.name}
                                className="mx-auto mb-2"
                            />
                            <span>{dish.name}</span>
                            <span className="block text-red-500">
                                {/* Kiểm tra discount để hiển thị giá */}
                                {dish.discount && dish.discount !== "0" ? (
                                    <>
                                        <del>{dish.price}K</del>
                                        <span className="block text-green-500">
                                            Giá sau giảm: {(dish.price * (1 - parseFloat(dish.discount) / 100)).toFixed(2)}K
                                        </span>
                                    </>
                                ) : (
                                    `${dish.price}K`
                                )}
                            </span>
                            <span className={`block ${dish.status === "available" ? "text-green-500" : "text-gray-500"}`}>
                                {dish.status === "available" ? "Còn hàng" : "Hết hàng"}
                            </span>
                            {dish.status === "available" && (
                                <button className="bg-green-500 text-white px-2 py-1 mt-2 rounded" onClick={() => addItem(dish)}>
                                    Thêm vào giỏ
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FoodList;
