import React from 'react';

const OrderItem = ({ item, onRemove }) => {
  const price = typeof item.price === 'string' ? parseFloat(item.price.replace(/[^0-9.]/g, '')) : item.price;
  const itemTotal = price * item.quantity;

  return (
    <div className="order-item" style={{ display: 'flex', gap: '15px', marginBottom: '10px' }}>
      <span><strong>{item.name}</strong></span>
      <span>Qty: {item.quantity}</span>
      <span>Price: ${itemTotal.toFixed(2)}</span>
      
      <button 
        className="remove" 
        onClick={() => onRemove(item.flavorId)}
      >
        Remove Item
      </button>
    </div>
  );
};


export default OrderItem;
