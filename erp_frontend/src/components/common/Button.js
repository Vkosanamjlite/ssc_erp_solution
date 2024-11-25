// src/components/common/Button.js
import React from 'react';

function Button({ children, onClick, type = 'button', className = 'primary' }) {
    return (
        <button type={type} onClick={onClick} className={`btn ${className}`}>
            {children}
        </button>
    );
}

export default Button;
