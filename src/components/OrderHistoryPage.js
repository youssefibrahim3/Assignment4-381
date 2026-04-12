import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './header';
import Footer from './footer';
import { API_BASE } from '../api';

function OrderHistoryPage() {
    const [orders, setOrders] = useState([]);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (!userId) {
            navigate('/login');
            return;
        }

        fetch(`${API_BASE}/orders?userId=${userId}`)
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setOrders(data.orders);
                } else {
                    setMessage(data.message);
                }
            })
            .catch(() => {
                setMessage("Error loading order history.");
            });
    }, [navigate]);

    return (
        <div>
            <Header />
            <div style={{ padding: '20px' }}>
                <h1>Order History</h1>
                {message && <p>{message}</p>}
                {orders.length === 0 ? (
                    <p>You have not placed any orders yet.</p>
                ) : (
                    orders.map(order => (
                        <div key={order.orderId} style={{ border: '1px solid #ccc', margin: '10px 0', padding: '10px' }}>
                            <h2>Order #{order.orderId}</h2>
                            <p>Total: ${order.total.toFixed(2)}</p>
                            <p>Date: {order.timestamp}</p>
                            <h3>Items:</h3>
                            <ul>
                                {order.items.map((item, index) => (
                                    <li key={index}>
                                        {item.name} - Quantity: {item.quantity} - Price: ${item.price}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))
                )}
            </div>
            <Footer />
        </div>
    );
}

export default OrderHistoryPage;