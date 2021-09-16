import React from 'react';
import './Header.scss'
import {Link} from "react-router-dom";

function Header() {
    return (
        <div className="header">
            <Link to="/" className="logo">
                <span>Moovi</span>
            </Link>
        </div>
    );
}

export default Header;
