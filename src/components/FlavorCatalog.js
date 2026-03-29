import React, { useState } from 'react';
import flavors from '../data/flavors'; 
import FlavorItem from './FlavorItem';

const FlavorGrid = ({ onAddToOrder }) => {
  return (
    <div 
      className="flavor-grid" 
      style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(3, 1fr)', 
        gap: '20px',
        padding: '20px' 
      }}
    >
      {flavors.map((flavor) => (
        <FlavorItem 
          key={flavor.id} 
          flavor={flavor} 
          onAdd={onAddToOrder} 
        />
      ))}
    </div>
  );
};

const FlavorCatalog = ({ onAdd }) => { 
  return (
    <div className="flavor-grid">
      {flavors.map(flavor => (
        <FlavorItem 
          key={flavor.id} 
          flavor={flavor} 
          onAdd={onAdd} 
        />
      ))}
    </div>
  );
};




export default FlavorCatalog;
