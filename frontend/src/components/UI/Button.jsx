import React from 'react';
import './Button.css';

const Button = ({ children, variant = 'primary', size = 'md', onClick, type = 'button', icon, disabled, className = '' }) => {
    return (
        <button
            type={type}
            className={`ui-btn btn-${variant} btn-${size} ${className}`}
            onClick={onClick}
            disabled={disabled}
        >
            {icon && <span className="btn-icon">{icon}</span>}
            {children}
        </button>
    );
};

export default Button;
