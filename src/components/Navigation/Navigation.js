import React from "react";
import Logo from '../Logo/Logo';
import './Navigation.css';

const Navigation = ({ onRouteChange, isSignedIn, route }) => {
    if (isSignedIn === true) {
        return (
            <nav className='navigation-container'>
                <Logo />
                <span className='loggin-text' onClick={() => onRouteChange('signout')}>
                    Sign Out
                </span>
            </nav>
        )
    } else {
        return (
            <nav className='navigation-container'>
                <Logo />
                {route === 'register' && 
                    <span className='loggin-text' onClick={() => onRouteChange('signin')}>
                        Sign In
                    </span>
                }
            </nav>
        )
    }
};

export default Navigation;
