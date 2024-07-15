import React from 'react';
import {Button, Col, Row} from "antd";
import {CaretLeftOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";

const BackButton = ({path, children}) => {
    const navigate = useNavigate();
    const handleClick = (thePath) => {
        navigate(thePath)
    }
    return (

        <Button style={{color: 'white'}} type={'link'} icon={<CaretLeftOutlined/>}
                onClick={() => handleClick(path)} className={'from-blue-50' +
            '6620'}>
            {children}
        </Button>

    )
        ;
};

export default BackButton;