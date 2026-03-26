
import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'


function Header()
{
    return (
    <body>
        <header>
            <div>
                <img src="img/logo.jpeg" alt="Sweet Scoop Ice Cream Logo"/>
            </div>
            <div>
                <h3>Sweet Scoop Ice Cream</h3>
            </div>
        </header>
        <div className="navbar">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element = {<Home/>}/>
                    <Route path="/" element = {<Home/>}/>
                    <Route path="/" element = {<Home/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    </body>
    );
}
export default Header;