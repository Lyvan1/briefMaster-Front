import React from 'react';
import './maskStyle.css';

const Mask = ({ children }) => {
    return (
        <div className='mask-container' >

            {children}
        </div>
    );
};

export default Mask;
