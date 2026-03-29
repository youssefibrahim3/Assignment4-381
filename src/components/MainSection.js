
import React from 'react'
import { useEffect, useState } from 'react';
import flavors from '../data/flavors.js'
import reviews from '../data/reviews.js'
function MainSection()
{

    //  NOTE: The image on the assignment shows it displaying three customer reviews,
    //  but the INSTRUCTIONS say to only display two customer reviews.

    const [randomFlavor, setRandomFlavor] = useState(flavors[0]);
    const [randomFlavor2, setRandomFlavor2] = useState(flavors[1]);
    const [randomFlavor3, setRandomFlavor3] = useState(flavors[2]);

    const [randomReview, setRandomReview] = useState(reviews[0]);
    const [randomReview2, setRandomReview2] = useState(reviews[1]);

    useEffect(() => {
        setRandomFlavor(flavors[Math.floor(Math.random() * flavors.length)]);
        setRandomFlavor2(flavors[Math.floor(Math.random() * flavors.length)]);
        setRandomFlavor3(flavors[Math.floor(Math.random() * flavors.length)]);

        setRandomReview(reviews[Math.floor(Math.random() * reviews.length)]);
        setRandomReview2(reviews[Math.floor(Math.random() * reviews.length)]);
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
            <div className='flavor-grid'>
                <div className='flavor-card'>
                    <h1>{randomFlavor.name}</h1>
                    <p>{randomFlavor.description}</p>
                    <p>Price: {randomFlavor.price}</p>
                    <img src={randomFlavor.image}></img>
                </div>
                <div className='flavor-card'>
                    <h1>{randomFlavor2.name}</h1>
                    <p>{randomFlavor2.description}</p>
                    <p>Price: {randomFlavor2.price}</p>
                    <img src={randomFlavor2.image}></img>
                </div>
                <div className='flavor-card'>
                    <h1>{randomFlavor3.name}</h1>
                    <p>{randomFlavor3.description}</p>
                    <p>Price: {randomFlavor3.price}</p>
                    <img src={randomFlavor3.image}></img>
                </div>
            </div>
            <h1>Customer Reviews</h1>
            
            <div>
                <h1>{randomReview.customerName}</h1>
                <p>Rating: {'★'.repeat(randomReview.rating) + '☆'.repeat(5 - randomReview.rating)}</p>
                <p>{randomReview.review}</p>
            </div>

            <div>
                <h1>{randomReview2.customerName}</h1>
                <p>Rating: {'★'.repeat(randomReview2.rating) + '☆'.repeat(5 - randomReview2.rating)}</p>
                <p>{randomReview2.review}</p>
            </div>
        </div>
    );
}
export default MainSection;