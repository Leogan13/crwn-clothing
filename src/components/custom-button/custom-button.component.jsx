import React from 'react';
import './custom-button.styles.scss';

const CustomButton = ({children, ...otherProps}) =>(
    
    <button className='custom-button' {...otherProps}>
        {children}
        {console.log(otherProps)}
    </button>
)

export default CustomButton;