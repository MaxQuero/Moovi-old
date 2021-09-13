import React from 'react';
import logo from './img/logo.png'; // Tell webpack this JS file uses this image
import './Header.scss'
import {Link} from "react-router-dom";

function Header() {
    return (
        <div className="header">
            <Link to="/" className="logo">
                <img src={logo} />
            </Link>
        </div>
    );
}

export default Header;
