import React from 'react';
import {Button} from "antd";
import {useNavigate} from "react-router-dom";

const AddEntityButton = ({icon, children, path}) => {
    const navigate = useNavigate();
    const handleClick = (thePath) => {
       navigate(thePath);
    }
    return (
        <Button icon={icon} size={'large'} onClick={() => handleClick(path)}>
            {children}
        </Button>
    );
};

export default AddEntityButton;