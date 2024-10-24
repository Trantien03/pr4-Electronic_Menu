import { useEffect, useState } from "react";

const OrderedItems = ({ orderedItems, handleQuantityChangeInOrder, onSubmit }) => {
    const [totalAmount, setTotalAmount] = useState(0);

    useEffect(() => {
        const calculateTotalAmount = () => {
            const total = orderedItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
            setTotalAmount(total);
        };

        calculateTotalAmount();
    }, [orderedItems]);

    // Sửa lại hàm handleQuantityChange để xóa món khi quantity là 0
    const handleQuantityChange = (id, quantity) => {
        if (quantity === 0) {
            handleRemoveItem(id);  // Gọi hàm xóa nếu số lượng là 0
        } else {
            handleQuantityChangeInOrder(id, quantity);  // Cập nhật số lượng
        }
    };

    // Hàm xóa món ăn khỏi giỏ hàng
    const handleRemoveItem = (id) => {
        handleQuantityChangeInOrder(id, 0);  // Gọi hàm xử lý với quantity là 0 để xóa
    };

    return (
        <div className="w-1/3 bg-gradient-to-r from-orange-100 to-white p-6 rounded-lg shadow-lg sticky top-0 h-[700px] flex flex-col justify-between">
            <div className="overflow-y-auto" style={{ maxHeight: '70vh' }}>
                <h2 className="text-orange-600 font-bold text-3xl mb-4 text-center">ORDER TABLE</h2>
                {orderedItems.length === 0 ? (
                    <p className="text-gray-600 text-center">No items selected yet.</p>
                ) : (
                    orderedItems.map((item, index) => (
                        <div key={index} className="flex justify-between items-center bg-white p-4 rounded-lg mb-2 shadow-md transition duration-200 hover:shadow-lg">
                            <div className="flex-1">
                                
                                <span className="font-semibold text-lg"> {item.name}</span>
                            </div>
                            <div className="flex-1 text-right">
                                <span className="text-red-600 font-semibold">
                                    {(item.price * item.quantity).toLocaleString()} $
                                </span>
                            </div>
                            <div className="flex-1">
                                <input
                                    type="number"
                                    min="0"
                                    value={item.quantity}
                                    onChange={(e) =>
                                        handleQuantityChange(item.id, parseInt(e.target.value))
                                    }
                                    className="w-10 ml-6 text-center border border-orange-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-200"
                                />
                            </div>
                            <div><button
                                    onClick={() => handleRemoveItem(item.id)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    X
                                </button>
                            </div>
                        </div>
                    ))
                )}

                <div className="flex justify-between mb-4 font-bold text-lg">
                    <span>Total Amount:</span>
                    <span className="text-red-600">
                        {totalAmount.toLocaleString()} $
                    </span>
                </div>
            </div>

            <div className="flex justify-center mt-4">
                <button className="bg-orange-500 text-white px-8 py-3 rounded-lg shadow-md transition duration-300 ease-in-out hover:bg-orange-400 hover:shadow-lg" onClick={onSubmit}>
                    Create Order
                </button>
            </div>
        </div>
    );
};

export default OrderedItems;
