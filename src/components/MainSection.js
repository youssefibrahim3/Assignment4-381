import React, { useEffect, useState } from 'react';
import { API_BASE } from '../api';

function MainSection() {
    const [flavors, setFlavors] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        Promise.all([
            fetch(`${API_BASE}/flavors`).then(res => res.json()),
            fetch(`${API_BASE}/reviews`).then(res => res.json())
        ])
        .then(([flavorsData, reviewsData]) => {
            if (flavorsData.success && reviewsData.success) {
                // Get 3 random flavors
                const allFlavors = flavorsData.flavors;
                const selectedFlavors = [];
                const usedIndices = new Set();
                while (selectedFlavors.length < 3 && selectedFlavors.length < allFlavors.length) {
                    const index = Math.floor(Math.random() * allFlavors.length);
                    if (!usedIndices.has(index)) {
                        usedIndices.add(index);
                        selectedFlavors.push(allFlavors[index]);
                    }
                }
                setFlavors(selectedFlavors);
                setReviews(reviewsData.reviews);
            } else {
                setError("Error loading data.");
            }
            setLoading(false);
        })
        .catch(() => {
            setError("Error loading data.");
            setLoading(false);
        });
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="main-section">
            <h1>About Sweet Scoop Ice Cream</h1>
            <p>
            Sweet Scoop Ice Cream is a family-owned business that has been serving delicious ice cream since 1990. We pride ourselves
            on using only the freshest ingredients to create our unique flavors. Whether you're in the mood for a classic vanilla or 
            something more adventurous like our signature "Chocolate Explosion," we have something for everyone. Come visit us and 
            treat yourself to a sweet scoop today!
            </p>
            <h1>Featured flavors</h1>
            <div className='flavor-grid'>
                {flavors.map((flavor, index) => (
                    <div key={index} className='flavor-card'>
                        <h1>{flavor.name}</h1>
                        <p>{flavor.description}</p>
                        <p>Price: {flavor.price}</p>
                        <img src={flavor.image} alt={flavor.name} />
                    </div>
                ))}
            </div>
            <h1>Customer Reviews</h1>
            {reviews.map((review, index) => (
                <div key={index}>
                    <h1>{review.customerName}</h1>
                    <p>Rating: {'★'.repeat(review.rating) + '☆'.repeat(5 - review.rating)}</p>
                    <p>{review.review}</p>
                </div>
            ))}
        </div>
    );
}
export default MainSection;