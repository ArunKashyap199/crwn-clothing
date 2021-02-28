import React from 'react';

import {CustomButtonContainer,  } from './custom-button.styles.jsx';
import './custom-button.styles';

const CustomButton = ({ children,...props }) => (
    <CustomButtonContainer {...props}>
        {children}
    </CustomButtonContainer>
);
export default CustomButton;
