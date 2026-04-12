import React, { useState, useEffect } from 'react';
import FlavorItem from './FlavorItem';
import { API_BASE } from '../api';

const FlavorCatalog = ({ onAdd }) => {
    const [flavors, setFlavors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetch(`${API_BASE}/flavors`)
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setFlavors(data.flavors);
                } else {
                    setError("Error loading flavors.");
                }
                setLoading(false);
            })
            .catch(() => {
                setError("Error loading flavors.");
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Loading flavors...</div>;
    if (error) return <div>{error}</div>;

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
