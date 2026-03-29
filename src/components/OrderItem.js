import React from 'react';

const OrderItem = ({ item, onRemove }) => {
  const numericPrice = typeof item.price === 'string' 
    ? parseFloat(item.price.replace('$', '')) 
    : item.price;

  return (
    <div className="order-item" style={{ display: 'flex', gap: '15px', marginBottom: '10px' }}>
      <span><strong>{item.name}</strong></span>
      <span>Qty: {item.quantity}</span>
      {}
      <span>Price: ${(numericPrice * item.quantity).toFixed(2)}</span>
      
      <button 
        className="remove" 
        onClick={() => onRemove(item.id)}
      >
        Remove Item
      </button>
    </div>
  );
};


export default OrderItem;
