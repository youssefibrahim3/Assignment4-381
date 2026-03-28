
import React from 'react'
import { useEffect } from 'react';
import flavors from '../data/flavors.js'
import reviews from '../data/reviews.js'
function MainSection()
{
    useEffect(() => {
        const randomFlavor1 = flavors[Math.floor(Math.random() * flavors.length)];
        const randomFlavor2 = flavors[Math.floor(Math.random() * flavors.length)];
        const randomFlavor3 = flavors[Math.floor(Math.random() * flavors.length)];

        const randomReview = reviews[Math.floor(Math.random() * reviews.length)];
        const randomReview2 = reviews[Math.floor(Math.random() * reviews.length)]

    }, []);
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

            <h1>Customer Reviews</h1>
        </div>
    );
}
export default MainSection;