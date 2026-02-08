import React from 'react';
import Sidebar from './Sidebar';
import './Layout.css';

const Layout = ({ children }) => {
    return (
        <div className="app-layout">
            <Sidebar />
            <main className="main-content">
                <header className="top-bar">
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 600 }}>Dashboard</h2>
                    <div className="user-profile">
                        <div className="avatar">SA</div>
                        <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>Sahil Admin</span>
                    </div>
                </header>
                <div className="page-content">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default Layout;
