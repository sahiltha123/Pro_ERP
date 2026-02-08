import React from 'react';
import './Card.css';

const Card = ({ children, title, actions, className = '' }) => {
    return (
        <div className={`ui-card ${className}`}>
            {(title || actions) && (
                <div className="card-header">
                    {title && <h3 className="card-title">{title}</h3>}
                    {actions && <div className="card-actions">{actions}</div>}
                </div>
            )}
            <div className="card-content">
                {children}
            </div>
        </div>
    );
};

export default Card;
