import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import logo from '../../assets/images/app_logo.png';
import './Header.css';

function Header() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [isMenuVisible, setIsMenuVisible] = useState(false); // State for menu visibility
    const navigate = useNavigate();

    const handleLogin = () => navigate('/login');
    const handleRegister = () => navigate('/register');
    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        setUser(null);
        setIsLoggedIn(false);
        navigate('/');
    };

    return (
        <header className="header">
            <div className="header-logo">
                <img src={logo} alt="ERP Logo" />
                <span>ERP System</span>
            </div>
            <nav className="header-menu">
                <ul>
                    <li><Link to="/dashboard">Dashboard</Link></li>
                    <li><Link to="/inventory">Inventory</Link></li>
                    <li><Link to="/sales">Sales</Link></li>
                    <li><Link to="/hr">Human Resources</Link></li>
                    <li><Link to="/finance">Finance</Link></li>
                    <li><Link to="/seo">SEO</Link></li>
                    <li><Link to="/stores">Stores</Link></li>
                </ul>
            </nav>
            <div className="header-search">
                <input type="text" placeholder="Search..." />
                <button>
                    <i className="fas fa-search"></i>
                </button>
            </div>
            <div
                className="header-user"
                onMouseEnter={() => setIsMenuVisible(true)}
                onMouseLeave={() => setIsMenuVisible(false)}
            >
                <i className="fas fa-user-circle"></i>
                {isMenuVisible && (
                    <div className="user-menu">
                        {isLoggedIn ? (
                            <>
                                <Link to="/profile">Profile</Link>
                                <button onClick={handleLogout}>Logout</button>
                            </>
                        ) : (
                            <>
                                <button onClick={handleRegister}>Register</button>
                                <button onClick={handleLogin}>Login</button>
                            </>
                        )}
                    </div>
                )}
            </div>
        </header>
    );
}

export default Header;
