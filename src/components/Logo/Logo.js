import React from "react";
import Tilt from 'react-parallax-tilt';
import BrainIcon from './brain.png';
import './Logo.css';

const Logo = () => {
    return (
        <div className='logo-container'>
            <Tilt>
                <img 
                    alt="Brain icon" 
                    src={BrainIcon} 
                    className='tilt'
                />
            </Tilt>
        </div>
    );
};

export default Logo;
