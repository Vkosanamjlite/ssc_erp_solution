import React from 'react';
import logo from '../../assets/images/app_logo.png'; // Replace with your logo file
import './Header.css';

function Header() {
    return (
        <header className="header">
            <div className="header-logo">
                <img src={logo} alt="ERP Logo" />
                <span>ERP System</span>
            </div>
            <nav className="header-menu">
                <ul>
                    <li><a href="/dashboard">Dashboard</a></li>
                    <li><a href="/inventory">Inventory</a></li>
                    <li><a href="/sales">Sales</a></li>
                    <li><a href="/hr">Human Resources</a></li>
                    <li><a href="/finance">Finance</a></li>
                </ul>
            </nav>
            <div className="header-search">
                <input type="text" placeholder="Search..." />
                <button>
                    <i className="fas fa-search"></i>
                </button>
            </div>
            <div className="header-user">
                <i className="fas fa-user-circle"></i>
                <div className="user-menu">
                    <a href="#profile">Profile</a>
                    <a href="#register">Register</a>
                    <a href="#login">Login</a>
                </div>
            </div>
        </header>
    );
}

export default Header;
