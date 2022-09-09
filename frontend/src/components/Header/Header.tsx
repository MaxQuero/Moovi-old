import React from 'react';
import './Header.scss';
import { Link, NavLink } from 'react-router-dom';

function Header() {
  return (
    <div className="header">
      <Link to="/" className="logo">
        <span>Moovi</span>
      </Link>
      <ul className="nav">
        <NavLink to="/movie" className="nav__item">
          Films
        </NavLink>
        <NavLink to="/tv" className="nav__item">
          Séries TV
        </NavLink>
        <NavLink to="/watchlist" className="nav__item">
          Watchlist
        </NavLink>
      </ul>
    </div>
  );
}

export default Header;
