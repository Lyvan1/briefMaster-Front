import React from 'react';
import {CaretLeftOutlined} from "@ant-design/icons";
import {Button, Col, Row} from "antd";
import BackButton from "../../components/Global/Buttons/BackButton";
import AddCompany from "../../components/Companies/AddCompany/AddCompany";
import CustomBreadCrumb from "../global/breadcrumb/CustomBreadCrumb";

const AddCompanyPage = () => {
    return (
        <>
            <Row justify={'start'} align={'middle'}  style={{position:'sticky', top:30, width:'100%', zIndex:2,}}>
                <Col justify={'start'} xs={{flex: '100%'}} sm={{flex: '100%'}} md={{flex: '100%'}}>
                    {/*<BackButton path={'/companies'}>Back to Companies</BackButton>*/}

                </Col>
            </Row>
            <Row justify={'center'} align={'middle'}  style={{width:'100%'}}>
               <AddCompany />
            </Row>
        </>

    );
};

export default AddCompanyPage;