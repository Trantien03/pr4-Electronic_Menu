import React, { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import { Link, useNavigate, useSearchParams } from 'react-router-dom'; 
import axios from "axios";
import Navbar from "./Navbar.jsx";
import Swal from "sweetalert2";
import { getTableFromUrl } from '../../components/Service/TableService'; 
import "./Cart.css";

const Cart = () => {
    const { cartItems, setCartItems, food_list, updateQuantity, removeFromCart, url } = useContext(StoreContext);
    const navigate = useNavigate(); 
    const [searchParams] = useSearchParams(); 
    const { tableId, tableName } = getTableFromUrl(searchParams);

    const totalOriginalPrice = food_list.reduce((total, item) => {
        const quantity = cartItems[item.id] ? cartItems[item.id].quantity : 0;
        return total + (item.price * quantity);
    }, 0);

    const totalAmount = food_list.reduce((total, item) => {
        const quantity = cartItems[item.id] ? cartItems[item.id].quantity : 0;
        const discount = item.discount ? parseFloat(item.discount) : 0;
        const discountedPrice = item.price * (1 - (discount / 100));
        return total + (discountedPrice * quantity);
    }, 0);

    const totalDiscount = totalOriginalPrice - totalAmount;

    const handleSendOrderRequest = async () => {
        try {
            const orderRequest = {
                customer: localStorage.getItem('username'),
                originalPrice: totalAmount,
                orderItems: Object.keys(cartItems).map(itemId => ({
                    dish_id: itemId,
                    quantity: cartItems[itemId].quantity,
                    note: cartItems[itemId].note || ""
                })),
                createAt: new Date().toISOString(),
                status: "Pending",
                payment: localStorage.getItem('paymentMethod')
            };

            if (Object.keys(cartItems).length > 0) {
                const response = await axios.post(`http://localhost:8080/api/v1/orders/${tableId}`, orderRequest);
                if (response.status === 200) {
                    console.log("Order created successfully!", response.data);
                    localStorage.setItem('IdOrder', response.data);
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Order request sent to the chef!",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    localStorage.removeItem('cartItems');
                    setCartItems({});
                    navigate(`/?table_id=${tableId}&table_name=${tableName}`);
                } else {
                    console.error("Error creating order: ", response);
                    alert("An error occurred while creating the order.");
                }
            } else {
                alert("Please select at least one dish!");
            }
        } catch (error) {
            console.error("Error while sending order request: ", error);
            alert("An error occurred while sending the order request.");
        }
    };

    return (
        <section className="bg-gray-100 min-h-screen">
            <Navbar />
            {Object.keys(cartItems).length > 0 ? (
                <div className="container mx-auto p-4">
                    <div className="flex flex-col space-y-4 lg:flex-row lg:space-x-4">
                        <div className="bg-white shadow-lg rounded-lg p-4 lg:w-3/4">
                            <div className="cart-items">
                                {food_list.map((item) => {
                                    const quantity = cartItems[item.id] ? cartItems[item.id].quantity : 0;
                                    if (quantity > 0) {
                                        const discount = item.discount ? parseFloat(item.discount) : 0;
                                        const discountedPrice = item.price * (1 - (discount / 100));
                                        return (
                                            <div key={item.id} className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 items-center text-center py-4 border-b">
                                                <div className="lg:col-span-1">
                                                    <img src={`${url}/images/${item.image}`} alt={item.name} className="w-24 h-24 object-cover mx-auto" />
                                                </div>
                                                
                                                <div className="lg:col-span-1 text-left flex items-center">
                                                    <input
                                                        type="number"
                                                        min="1"
                                                        value={quantity}
                                                        onChange={(e) => updateQuantity(item.id, parseInt(e.target.value, 10) || 0)}
                                                        className="form-control border p-1 w-10 text-center mr-1"
                                                    />
                                                    <span className="text-red-500 font-bold text-lg mr-2">×</span>
                                                    <span>{item.name}</span>
                                                </div>

                                                <div className="hidden lg:block ml-8">
                                                    <span>{item.description}</span>
                                                     
                                                </div>

                                                <div className="lg:col-span-1">${(discountedPrice * quantity).toFixed(2)}</div>
                                              
                                                <div className="hidden lg:block">
                                                    {cartItems[item.id] && cartItems[item.id].note ? (
                                                        cartItems[item.id].note
                                                    ) : (
                                                        "No note"
                                                    )}
                                                </div>
                                                
                                                <div className="lg:col-span-1">
                                                    <button onClick={() => removeFromCart(item.id)} className='text-red-600 hover:text-red-800'>Remove</button>
                                                </div>
                                            </div>
                                        );
                                    }
                                    return null;
                                })}
                            </div>
                        </div>
                        <div className="bg-white shadow-lg rounded-lg p-4 lg:w-1/4">
                            <h2 className="text-xl font-bold">Order Summary</h2>
                            <div className="flex justify-between mt-2">
                                <p>Total Original Price</p>
                                <p>${totalOriginalPrice.toFixed(2)}</p>
                            </div>
                            <div className="flex justify-between">
                                <p>Discount</p>
                                <p>-${(totalOriginalPrice - totalAmount).toFixed(2)}</p>
                            </div>
                            <div className="flex justify-between">
                                <p>Total Price After Discount</p>
                                <p>${totalAmount.toFixed(2)}</p>
                            </div>
                            <hr className="my-2" />
                            <div className="flex justify-between font-bold">
                                <span>Grand Total</span>
                                <span>${totalAmount === 0 ? 0 : totalAmount.toFixed(2)}</span>
                            </div>
                            <button className="btn btn-danger mt-2 w-full" onClick={handleSendOrderRequest}>
                                Send Order Request
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="empty-cart-container text-center">
                    <div className="image-cart-empty">
                        <img src="/src/assets/cart_empty.jpg" alt="Empty Cart" className="mx-auto w-64" />
                    </div>
                    <div className="empty-cart-message mt-4">
                        <p>Your cart is empty! Please select some food items.</p>
                    </div>
                    <Link to={`/menu?table_id=${tableId}&table_name=${tableName}`} className="btn btn-primary mt-4">
                        Go to Menu
                    </Link>
                </div>
            )}
        </section>
    );
};

export default Cart;
