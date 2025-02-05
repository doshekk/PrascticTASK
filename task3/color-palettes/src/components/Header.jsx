import React from 'react';
import './Header.css';

const Header = () => {
    return (
        <header>
            <div className="logo">
                <h1>Кольорові палітри</h1>
            </div>
            <nav className="nav-links">
                <a href="#home">Головна</a>
                <a href="#about">Про нас</a>
                <a href="#services">Послуги</a>
                <a href="#contact">Контакти</a>
            </nav>
        </header>
    );
};

export default Header;