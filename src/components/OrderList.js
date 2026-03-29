import React from 'react'; 
import OrderItem from './OrderItem';

const OrderList = ({ order, setOrder }) => {
  
  const handleRemove = (id) => {
    setOrder(prevOrder => 
      prevOrder.reduce((acc, item) => {
        if (item.id === id) {
          if (item.quantity > 1) acc.push({ ...item, quantity: item.quantity - 1 });
        } else {
          acc.push(item);
        }
        return acc;
      }, [])
    );
  };

  const totalPrice = order.reduce((sum, item) => {
    const numericPrice = typeof item.price === 'string' 
      ? parseFloat(item.price.replace('$', '')) 
      : item.price;
    return sum + (numericPrice * item.quantity);
  }, 0);

  return (
    <div className="order-list">
      <h2>Your Order</h2>
      {order.map(item => (
        <OrderItem key={item.id} item={item} onRemove={handleRemove} />
      ))}
      <div className="total">
        <h3>Total: ${totalPrice.toFixed(2)}</h3>
      </div>
    </div>
  );
};

export default OrderList;
