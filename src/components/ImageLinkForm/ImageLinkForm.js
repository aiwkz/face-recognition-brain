import React from "react";
import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange }) => {
    return (
        <div className='form-container'>
            <div className='form-title'>
                <span>This magic brain will detect faces in your images.</span>
                <span>Paste the img url to try!</span>
            </div>
            <div className='center'>
                <input type='text' onChange={onInputChange}/>
                <button 
                    className='form-button'
                    style={{ '--clr':'#0FF0FC' }}
                >
                    <span>Detect</span>
                    <i></i>
                </button>
            </div>
        </div>
    );
}

export default ImageLinkForm;
