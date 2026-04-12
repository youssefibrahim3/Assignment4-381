import React from 'react'; 
import OrderItem from './OrderItem';

const OrderList = ({ order, onRemove, onPlaceOrder }) => {
    const totalPrice = order.reduce((sum, item) => {
        const price = typeof item.price === 'string' ? parseFloat(item.price.replace(/[^0-9.]/g, '')) : item.price;
        return sum + (price * item.quantity);
    }, 0);

    return (
        <div className="order-list">
            <h2>Your Order</h2>
            {order.map(item => (
                <OrderItem key={item.flavorId} item={item} onRemove={() => onRemove(item.flavorId)} />
            ))}
            <div className="total">
                <h3>Total: ${totalPrice.toFixed(2)}</h3>
                <button onClick={onPlaceOrder} style={{ marginTop: '10px', padding: '10px 20px' }}>Place Order</button>
            </div>
        </div>
    );
};

export default OrderList;
