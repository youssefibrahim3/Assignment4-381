
import React from 'react'
import {Link} from 'react-router-dom'

function Header()
{
    return (
        <header>
            <div className='header-top'>
                <img src="/images/logo.webp" alt="Sweet Scoop Ice Cream Logo" />
                <h1>Sweet Scoop Ice Cream</h1>
            </div>

            <div className='navbar'>
                <Link to="/">Home</Link>
                <Link to="/flavors">Flavors</Link>
                <Link to="/login">Login</Link>
            </div>  
        </header>
    );
}
export default Header;