
import React from 'react'
import {Link} from 'react-router-dom'
import HomePage from './HomePage.js'

function FlavorsPage()
{
    return (
        <header>
            <div>
                <img src="images/logo.jpg" alt="Sweet Scoop Ice Cream Logo"/>
                <h1>Sweet Scoop Ice Cream</h1>
            </div>
            <div className="navbar">
                <Link to="/">Home</Link>
                <Link to="/flavors">Flavors</Link>
                <Link to="/login">Login</Link>
            </div>  
        </header>
    );
}
export default FlavorsPage;