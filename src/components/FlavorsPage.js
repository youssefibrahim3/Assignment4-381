import React, { useState, useEffect } from 'react';
import FlavorCatalog from './FlavorCatalog';
import OrderList from './OrderList';
import Footer from './footer';
import Header from './header';

function FlavorsPage() {
    const [order, setOrder] = useState([]);

    // Move LocalStorage logic here so it persists for the whole page
    useEffect(() => {
        const savedOrder = localStorage.getItem('iceCreamOrder');
        if (savedOrder) setOrder(JSON.parse(savedOrder));
    }, []);

    useEffect(() => {
        localStorage.setItem('iceCreamOrder', JSON.stringify(order));
    }, [order]);

    // This function handles the "Add to Order" logic
    const handleAddToOrder = (flavor) => {
        setOrder(prevOrder => {
            const existingItem = prevOrder.find(item => item.id === flavor.id);
            if (existingItem) {
                return prevOrder.map(item =>
                    item.id === flavor.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prevOrder, { ...flavor, quantity: 1 }];
        });
    };

    return (
        <div className="flavors-page">
            <Header />
            <div className="content">
                {/* Pass the function to the Catalog */}
                <FlavorCatalog onAdd={handleAddToOrder} />
                {/* Pass the data to the List */}
                <OrderList order={order} setOrder={setOrder} />
            </div>
            <Footer />
        </div>
    );
}

export default FlavorsPage;
