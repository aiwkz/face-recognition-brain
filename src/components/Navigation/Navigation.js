import React from "react";
import Logo from '../Logo/Logo';
import './Navigation.css';

const Navigation = () => {
    return (
        <nav className='navigation-container'>
            <Logo />
            <p className='loggin-text'>Sign Out</p>
        </nav>
    );
}

export default Navigation;
