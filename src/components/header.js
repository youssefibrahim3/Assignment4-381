
import React from 'react'
import {Link, useNavigate} from 'react-router-dom'

function Header()
{
    const navigate = useNavigate();
    const userId = localStorage.getItem('userId');

    const handleLogout = () => {
        localStorage.removeItem('userId');
        localStorage.removeItem('username');
        navigate('/');
    };

    return (
        <header>
            <div className='header-top'>
                <img src="/images/logo.webp" alt="Sweet Scoop Ice Cream Logo" />
                <h1>Sweet Scoop Ice Cream</h1>
                <div style={{ marginLeft: 'auto' }}>
                    {userId ? (
                        <button onClick={handleLogout}>Logout</button>
                    ) : (
                        <Link to="/login">Login</Link>
                    )}
                </div>
            </div>

            <div className='navbar'>
                <Link to="/">Home</Link>
                <Link to="/flavors">Flavors</Link>
                <Link to="/order-history">Order History</Link>
            </div>  
        </header>
    );
}
export default Header;