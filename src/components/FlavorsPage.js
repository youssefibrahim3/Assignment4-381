import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FlavorCatalog from './FlavorCatalog';
import OrderList from './OrderList';
import Footer from './footer';
import Header from './header';
import { API_BASE } from '../api';

function FlavorsPage() {
    const [order, setOrder] = useState([]);
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (!userId) {
            navigate('/login');
            return;
        }

        // Fetch cart from backend
        fetch(`${API_BASE}/cart?userId=${userId}`)
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setOrder(data.cart);
                } else {
                    setMessage(data.message);
                    setMessageType("error");
                }
            })
            .catch(() => {
                setMessage("Error loading cart.");
                setMessageType("error");
            });
    }, [navigate]);

    const handleAddToOrder = (flavor) => {
        const userId = localStorage.getItem('userId');
        if (!userId) {
            navigate('/login');
            return;
        }

        // Check if flavor is already in cart
        const existingItem = order.find(item => item.flavorId === flavor.id);
        if (existingItem) {
            fetch(`${API_BASE}/cart`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: parseInt(userId),
                    flavorId: flavor.id,
                    quantity: existingItem.quantity + 1,
                }),
            })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setOrder(data.cart);
                } else {
                    setMessage(data.message);
                    setMessageType("error");
                }
            })
            .catch(() => {
                setMessage("Error updating cart.");
                setMessageType("error");
            });
        } else {
            // Add new item
            fetch(`${API_BASE}/cart`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: parseInt(userId),
                    flavorId: flavor.id,
                }),
            })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setOrder(data.cart);
                } else {
                    setMessage(data.message);
                    setMessageType("error");
                }
            })
            .catch(() => {
                setMessage("Error adding to cart.");
                setMessageType("error");
            });
        }
    };

    const handleRemove = (flavorId) => {
        const userId = localStorage.getItem('userId');
        if (!userId) {
            navigate('/login');
            return;
        }

        fetch(`${API_BASE}/cart`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: parseInt(userId),
                flavorId: flavorId,
            }),
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                setOrder(data.cart);
            } else {
                setMessage(data.message);
                setMessageType("error");
            }
        })
        .catch(() => {
            setMessage("Error removing from cart.");
            setMessageType("error");
        });
    };

    const handlePlaceOrder = () => {
        const userId = localStorage.getItem('userId');
        if (!userId) {
            navigate('/login');
            return;
        }

        fetch(`${API_BASE}/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: parseInt(userId),
            }),
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                setMessage("Order placed successfully!");
                setMessageType("success");
                setOrder([]);
            } else {
                setMessage(data.message);
                setMessageType("error");
            }
        })
        .catch(() => {
            setMessage("Error placing order.");
            setMessageType("error");
        });
    };

    return (
        <div className="flavors-page">
            <Header />
            <div className="content">
                <FlavorCatalog onAdd={handleAddToOrder} />
                <OrderList order={order} onRemove={handleRemove} onPlaceOrder={handlePlaceOrder} />
                {message && <div style={{ textAlign: 'center', margin: '10px', color: messageType === 'success' ? 'green' : 'red' }}>{message}</div>}
            </div>
            <Footer />
        </div>
    );
}

export default FlavorsPage;
