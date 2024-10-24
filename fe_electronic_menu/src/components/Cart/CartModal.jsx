const CartModal = () => {
    const { cart, removeFromCart, adjustQuantity } = useCart();
    
    const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <div className="cart-modal">
            <h2>Giỏ hàng của bạn</h2>
            {cart.length === 0 ? (
                <p>Giỏ hàng trống.</p>
            ) : (
                <ul>
                    {cart.map((item) => (
                        <li key={item.id}>
                            <img src={item.image} alt={item.name} />
                            <div>
                                <h3>{item.name}</h3>
                                <p>{item.price} VND</p>
                                <div className="quantity-controls">
                                    <button onClick={() => adjustQuantity(item.id, item.quantity - 1)}>-</button>
                                    <span>{item.quantity}</span>
                                    <button onClick={() => adjustQuantity(item.id, item.quantity + 1)}>+</button>
                                </div>
                                <button onClick={() => removeFromCart(item.id)}>Xóa</button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
            <h3>Tổng tiền: {totalPrice} VND</h3>
            <button className="checkout-btn">Thanh toán</button>
        </div>
    );
};
