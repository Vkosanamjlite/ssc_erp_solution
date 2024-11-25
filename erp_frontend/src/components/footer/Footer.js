import React from 'react';
import './Footer.css';

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container">

                {/* About Us Section */}
                <div className="footer-about">
                    <h3>About Us</h3>
                    <p>
                        We are a comprehensive ERP solution provider dedicated to helping businesses streamline their operations. Our tools empower teams to improve efficiency and achieve greater insights into their workflows.
                    </p>
                </div>

                {/* Contact Us Section */}
                <div className="footer-contact">
                    <h3>Contact Us</h3>
                    <p>Email: support@erpsystem.com</p>
                    <p>Phone: +1 (555) 123-4567</p>
                    <p>Address: 123 ERP Avenue, Suite 100, Business City, USA</p>
                </div>

                {/* Social Media Icons Section */}
                <div className="footer-social">
                    <h3>Follow Us</h3>
                    <div className="social-icons">
                        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-facebook-f"></i>
                        </a>
                        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-instagram"></i>
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-twitter"></i>
                        </a>
                        <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-youtube"></i>
                        </a>
                        <a href="https://www.google.com" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-google"></i>
                        </a>
                    </div>
                </div>
            </div>

            {/* Copyright Section */}
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} ERP System. All rights reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;
