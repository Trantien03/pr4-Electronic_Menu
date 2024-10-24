import React from "react";

const OrderedItems = ({ orderedItems, totalAmount, handleQuantityChangeInOrder,onSubmit }) => {
    return (
        <div className="w-1/3 bg-gray-100 p-4 sticky top-0 h-[600px] flex flex-col justify-between">
            {/* Nội dung phía trên */}
            <div>
                <h2 className="text-orange-500 font-bold mb-2">BẢNG ORDER</h2>
                {orderedItems.length === 0 ? (
                    <p>Chưa có món nào được chọn.</p>
                ) : (
                    orderedItems.map((item, index) => (
                        <div key={index} className="flex justify-between items-center mb-1">
                            <div className="row">
                                <span>{item.quantity} x {item.name} </span>
                            </div>
                            <div className="row">
                                <span className="text-red-500">
                                    {(item.price * item.quantity).toLocaleString()} VND
                                </span>
                            </div>
                            <div className="row">
                                <input
                                    type="number"
                                    min="1"
                                    value={item.quantity}
                                    onChange={(e) =>
                                        handleQuantityChangeInOrder(item.id, parseInt(e.target.value))
                                    }
                                    className="w-16 ml-2 text-center border rounded"
                                />
                            </div>
                        </div>
                    ))
                )}

                <div className="flex justify-between mb-2">
                    <span>Tổng Tiền:</span>
                    <span className="text-red-500">
                        {totalAmount.toLocaleString()} VND
                    </span>
                </div>
            </div>

            <div className="flex space-x-2 mt-4">
                <button className="bg-orange-700 text-white px-4 py-2 rounded" onClick={onSubmit}>
                    Lưu & In
                </button>
            </div>
        </div>
    );
};

export default OrderedItems;
