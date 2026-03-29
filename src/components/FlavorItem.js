import React, { useState } from 'react';

const IceCreamCard = ({ flavor, onAdd }) => { 
  const [showDescription, setShowDescription] = useState(false);


  return (
    <div 
      className="flavor-card"
      onMouseEnter={() => setShowDescription(true)}
      onMouseLeave={() => setShowDescription(false)}
      style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px', width: '250px' }}
    >
      <img 
        src={flavor.image} 
        alt={flavor.name} 
        style={{ width: '100%', height: 'auto' }} 
      />
      
      <h3>{flavor.name}</h3>
      <p>{flavor.price}</p>

      {showDescription && (
        <p className="description" style={{ fontStyle: 'italic', color: '#555' }}>
          {flavor.description}
        </p>
      )}

      {}
      <button onClick={() => onAdd(flavor)}>
        Add to Order
      </button>
    </div>
  );
};

export default IceCreamCard;
