
import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import HomePage from './HomePage.js'

function Header()
{
    return (

        <header>
            <div>
                <img src="img/logo.jpeg" alt="Sweet Scoop Ice Cream Logo"/>
            </div>
            <div>
                <h3>Sweet Scoop Ice Cream</h3>
            </div>
            <div className="navbar">

            </div>
        </header>
    );
}
export default Header;