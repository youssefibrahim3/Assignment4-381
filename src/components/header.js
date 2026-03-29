
import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'

function Header()
{
    return (

        <header>
            <div>
                <img src="images/logo.jpg" alt="Sweet Scoop Ice Cream Logo"/>
            </div>
            <div>
                <h3>Sweet Scoop Ice Cream</h3>
            </div>
            <div className="navbar">
                <a>Home</a>
                <a>Flavors</a>
                <a>Login</a>

            </div>  
        </header>
    );
}
export default Header;