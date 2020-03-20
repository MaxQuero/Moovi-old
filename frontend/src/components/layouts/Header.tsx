import React from 'react';
import logo from './img/moovi.png'; // Tell webpack this JS file uses this image
import './header.scss'
export default class Header extends React.Component {
    render() {
        return (
            <div className="header">
                <div className="logo">
                    <img src={logo} />
                </div>
            </div>
        );
    }
}
