import React from 'react';

import '../styles/box.scss'

const Box = ({ children, className }) => {
    className = className || ''
    return (
        <div className={`box ${className}`}>
            {children}
        </div>
    );
};

export default Box;