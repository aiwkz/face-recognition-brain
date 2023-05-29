import React from "react";
import './FaceRecognition.css';

const FaceRecognition = ({ imageUrl, boxes }) => {
    return (
        <div className='center'>
            <div className='img-container'>
                <img 
                    id='inputImage'
                    className='img'
                    alt='' 
                    src={imageUrl}    
                />
                {boxes.map(box => (
                    <div 
                        key={box.topRow}
                        className='bounding-box'
                        style={{ 
                            top: box.topRow,
                            right: box.rightCol,
                            bottom: box.bottomRow,
                            left: box.leftCol,
                        }}    
                    ></div>
                ))}
            </div>
        </div>
    );
};

export default FaceRecognition;
