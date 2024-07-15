import React, {useEffect, useRef, useState} from 'react';
import {Button, Col, Form, Input, notification, Row} from "antd";
import FormFields from "./formFields/FormFields";
import {FaBuildingCircleCheck, FaBuildingCircleExclamation} from 'react-icons/fa6';
import {useNavigate} from "react-router-dom";
import companyProvider from "../../../dataProvider/companyProvider";


const AddCompany = () => {
const navigate = useNavigate();
    // State for validation errors. used as props in <FormUpdateCompany /> component
    const [errors, setErrors] = useState({})

    // State for form Data.  used as props in <FormUpdateCompany /> component
    const [dataFromStepOne, setDataFromStepOne] = useState({})

    // Create a ref for the notification container.
    const notificationContainerRef = useRef(null);
    const handleSubmit = async () => {
        //Errors to null before a new validation
        setErrors({});
        try {
            const response = await companyProvider.createCompany(dataFromStepOne)

            if (response) {
                console.log('response post company', response);
                notif.success({
                    message: 'You\'ve created a new company!',
                    description: `${response.name} is added to the companies List. You can add a user now.`,
                    placement: 'top',
                    style: {backgroundColor: '#05B112', borderRadius: '10px'},
                    icon: (<FaBuildingCircleCheck style={{color: 'white'}}/>),
                    className: 'custom-notification',
                    duration: 3
                })
                setTimeout(() =>{
                    navigate('/companies');
;                },2000)
            }
        } catch (error) {
            notif.error({
                message: 'An error occured.',
                description: 'Please check for input errors and try again.',
                placement: 'top',
                style: {backgroundColor: 'red', borderRadius: '10px'},
                icon: (<FaBuildingCircleExclamation style={{color: 'white'}}/>),
                className: 'custom-notification',
                duration: 3
            })
            console.log('error company',error)
            //save errors in the state "errors"
            setErrors(error);
        }

    }

    const [notif, contextHolder] = notification.useNotification();

    useEffect(() => {
console.log('data from step one', dataFromStepOne);
    }, [dataFromStepOne]);


    return (

        <>
            {/* Displaying the notification when a company is created.*/}
            {contextHolder}

            <Form
                name="addCompany"
                autoComplete="on"
                preserve
                style={{width: '100%'}}
                className={'mt-3'}
            >
                <Row justify={'center'} align={'middle'} className={'text-center mb-9 mt-5'}>
                    <Col span={24}>
                        <h1 className={'text-5xl'}>{dataFromStepOne.name === undefined ? 'New Company' : dataFromStepOne.name }</h1>
                    </Col>
                </Row>
                <FormFields errors={errors} setErrors={setErrors} data={dataFromStepOne} setData={setDataFromStepOne}/>


                <Col md={{flex: '50%'}} xs={{flex: '100%'}} sm={{flex: '100%'}} className={'text-right'}>

                    <Form.Item className={'px-5'}>
                        <Button type='default' size={'large'} htmlType={'submit'}
                                onClick={(e) => handleSubmit()}>
                            Envoyer
                        </Button>
                    </Form.Item>
                </Col>
            </Form>
        </>
    );
};

export default AddCompany;