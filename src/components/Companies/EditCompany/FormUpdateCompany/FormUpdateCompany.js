import React, {useEffect, useState} from 'react';
import {Col, Row, Form, Input, Upload, message} from "antd";
import {FaBuilding, FaHashtag, FaLocationDot} from "react-icons/fa6";
import * as Yup from 'yup';
import {object, string, number, typeError, addMethod, mixed} from 'yup'
import {LoadingOutlined, PlusOutlined} from "@ant-design/icons";
import env from 'react-dotenv';

function FormUpdateCompany({errors, setErrors, data, setData, company}) {

    //State for touched field property
    const [touchedField, setTouchedField] = useState({})

    const [imageUrl, setImageUrl] = useState();
    const [file, setFile] = useState({});
    const [loading, setLoading] = useState(false);
    const beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        //return isJpgOrPng && isLt2M;
        return false;
    };

    const handleChange = (info) => {
        console.log('info', info);
        setErrors(prevErrors => ({...prevErrors, isLt2M: null, isJpgOrPng: null}));

        const isJpgOrPng = info.file.type === 'image/jpeg' || info.file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG files!');
            setErrors({isJpgOrPng: 'You can only upload JPG/PNG files!'});
            setImageUrl(null); // Réinitialiser l'URL de l'image en cas d'erreur
            setFile(null); // Réinitialiser le fichier en cas d'erreur
            return; // Arrêter l'exécution car il y a une erreur de type de fichier
        }

        const isLt2M = info.file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must be smaller than 2MB!');
            setErrors({isLt2M: 'Image must be smaller than 2MB!'});
            setImageUrl(null); // Réinitialiser l'URL de l'image en cas d'erreur
            setFile(null); // Réinitialiser le fichier en cas d'erreur
            return; // Arrêter l'exécution car il y a une erreur de taille de fichier
        }

        getBase64(info.fileList[0].originFileObj, (url) => {
            setLoading(false);
            setImageUrl(url);
            setData(prevData => ({...prevData, logoFile: info.fileList[0].originFileObj})); // Définir le fichier uniquement s'il n'y a pas d'erreur
        });
        console.log('image url', imageUrl);
    };
    const getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
        console.log('reader', reader);
    };


    const uploadButton = (
        <button
            style={{
                border: 0,
                background: 'none',
            }}
            type="button"
        >
            {loading ? <LoadingOutlined/> : <PlusOutlined/>}
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </button>
    );


    // Définition du schéma de validation avec Yup
    Yup.addMethod(Yup.mixed, 'logoFile', function () {
        return this.test('logoFile', 'Invalid logoFile file', function (value) {
            if (!value) return true; // Pas de fichier téléchargé, donc aucune validation nécessaire
            return value && (value.type === 'image/png' || value.type === 'image/jpeg') && (value.size / 1024 / 1024 < 2);
        });
    });
    // Schéma de validation pour le champ name
    const nameSchema = string().required('Please enter the company name.').min(5, 'Company Name must be at least 5 characters long.');

    // Schéma de validation pour le champ companyRegistrationNumber
    const companyRegistrationNumberSchema = number()
        .required('Please enter a valid Company Registration Number.')
        .min(8, 'This field must be at least 8 digits.')
        .typeError('This field can only contain numbers.');

    // Schéma de validation pour le champ vatNumber
    const vatNumberSchema = number()
        .required('Please enter a valid VAT NUmber.')
        .min(8, 'This field must be at least 8 digits.')
        .typeError('This field can only contain numbers.');

    // Schéma de validation pour le champ country
    const countrySchema = string().required('Please enter the country.').min(3, 'Country must be at least 3 characters long.');

    // Schéma de validation pour le champ address
    const addressSchema = string().required('Please enter the address company.').min(5, 'Address must be at least 5 characters long.');

    // Schéma de validation pour le champ zipcode
    const zipcodeSchema = string().required('Please enter the zip code.').length(5, 'Zip Code must be 5 characters');

    // Schéma de validation pour le champ city
    const citySchema = string().required('Please enter the city company.').min(3, 'The city must be at least 3 characters long.');


    //schéma validationa vatar
    const logoFileSchema = Yup.mixed().logoFile();
    const handleBlur = async (fieldName, value) => {
        setTouchedField(prevTouchedField => ({...prevTouchedField, [fieldName]: true}));
        let fieldSchema;
        let fieldError;
        switch (fieldName) {
            case 'name':
                fieldSchema = nameSchema;
                break;
            case 'companyRegistrationNumber':
                fieldSchema = companyRegistrationNumberSchema;
                break;
            case 'vatNumber':
                fieldSchema = vatNumberSchema;
                break;
            case 'country':
                fieldSchema = countrySchema;
                break;
            case 'address':
                fieldSchema = addressSchema;
                break;
            case 'zipcode':
                fieldSchema = zipcodeSchema;
                break;
            case 'city':
                fieldSchema = citySchema;
                break;
            case 'logoFile':
                fieldSchema = logoFileSchema;
                break;
            default:
                break;
        }
        if (value === '') {
            setTouchedField(false);
            setErrors(prevErrors => ({...prevErrors, [fieldName]: null}));
            setData({...data, [fieldName]: company[fieldName]});
            return;
        }
        try {
            await fieldSchema.validate(value); // Valider le champ spécifique
            setErrors(prevErrors => ({...prevErrors, [fieldName]: null})); // Pas d'erreur, donc on la met à null
            const validatedData = {...data, [fieldName]: value};
            setData(validatedData);
        } catch (validationError) {
            setErrors(prevErrors => ({...prevErrors, [fieldName]: validationError.message}));
        }
    };

    return (
        <>
            <Form
                autoComplete="on"
                preserve
                style={{width: '100%'}}
                className={'mt-3'}
            >

                <Row justify={'center'} align={'middle'}>
                    <Col md={{flex: '50%'}} xs={{flex: '100%'}} sm={{flex: '100%'}}>
                        {/* eslint-disable-next-line react/jsx-no-undef */}
                        <Form.Item
                            name='name'
                            wrapperCol={{span: 24}}
                            hasFeedback
                            validateStatus={errors.name ? 'error' : (touchedField.name ? 'success' : '')} // Statut de validation du champ
                            help={errors.name}// Message d'erreur affiché à côté du champ en cas d'erreur
                            onBlur={(e) => handleBlur('name', e.target.value)}
                            className={'px-5'}
                        >
                            <Input prefix={<FaBuilding/>} variant='filled'
                                   size="large" placeholder={company.name}
                            />
                        </Form.Item>
                    </Col>
                    <Col md={{flex: '50%'}} xs={{flex: '100%'}} sm={{flex: '100%'}}>
                        <Form.Item
                            name='companyRegistrationNumber'
                            wrapperCol={{span: 24}}
                            hasFeedback
                            validateStatus={errors.companyRegistrationNumber ? 'error' : (touchedField.companyRegistrationNumber ? 'success' : '')}
                            help={errors.companyRegistrationNumber}
                            onBlur={(e) => handleBlur('companyRegistrationNumber', e.target.value)}
                            className={'px-5'}
                        >
                            <Input prefix={<FaHashtag/>} variant='filled' size="large"
                                   placeholder={company.companyRegistrationNumber}/>

                        </Form.Item>
                    </Col>
                </Row>

                <Row justify={'center'} align={'middle'}>
                    <Col md={{flex: '50%'}} xs={{flex: '100%'}} sm={{flex: '100%'}}>
                        <Form.Item
                            name='vatNumber'
                            wrapperCol={{span: 24}}
                            hasFeedback
                            validateStatus={errors.vatNumber ? 'error' : (touchedField.vatNumber ? 'success' : '')} //statut de validation du champ
                            help={errors.vatNumber}// Message d'erreur
                            onBlur={(e) => handleBlur('vatNumber', e.target.value)}
                            className={'px-5'}
                        >
                            <Input prefix={<FaHashtag/>} variant='filled' size="large" placeholder={company.vatNumber}/>
                        </Form.Item>

                    </Col>
                    <Col md={{flex: '50%'}} xs={{flex: '100%'}} sm={{flex: '100%'}}>
                        <Form.Item
                            name='country'
                            wrapperCol={{span: 24}}
                            hasFeedback
                            validateStatus={errors.country ? 'error' : (touchedField.country ? 'success' : '')}
                            help={errors.country}
                            onBlur={(e) => handleBlur('country', e.target.value)}
                            className={'px-5'}
                        >
                            <Input prefix={<FaLocationDot/>} placeholder={company.country} variant='filled'
                                   size='large'/>

                        </Form.Item>
                    </Col>
                </Row>
                <Row justify={'center'} align={'middle'}>
                    <Col md={{flex: '50%'}} xs={{flex: '100%'}} sm={{flex: '100%'}}>
                        <Form.Item
                            name='address'
                            wrapperCol={{span: 24}}
                            hasFeedback
                            validateStatus={errors.address ? 'error' : (touchedField.address ? 'success' : '')}
                            help={errors.address}
                            onBlur={(e) => handleBlur('address', e.target.value)}
                            className={'px-5'}
                        >
                            <Input prefix={<FaLocationDot/>} size='large' placeholder={company.address}
                                   variant='filled'/>
                        </Form.Item>
                    </Col>
                    <Col md={{flex: '50%'}} xs={{flex: '100%'}} sm={{flex: '100%'}}>
                        <Form.Item
                            name='zipcode'
                            wrapperCol={{span: 24}}
                            hasFeedback
                            className={'px-5'}
                            onBlur={(e) => handleBlur('zipcode', e.target.value)}
                            validateStatus={errors.zipcode ? 'error' : (touchedField.zipcode ? 'success' : '')} // Statut de validation du champ
                            help={errors.zipcode} // Message d'erreur affiché à côté du champ en cas d'erreur
                        >
                            <Input prefix={<FaLocationDot/>}
                                   placeholder={company.zipcode}
                                   variant='filled'
                                   size="large"
                                //onChange={}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row justify={'center'} align={'middle'}>
                    <Col md={{flex: '50%'}} xs={{flex: '100%'}} sm={{flex: '100%'}}>
                        <Form.Item
                            name='city'
                            wrapperCol={{span: 24}}
                            hasFeedback
                            className={'px-5'}
                            onBlur={(e) => handleBlur('city', e.target.value)}
                            validateStatus={errors.city ? 'error' : (touchedField.city ? 'success' : '')} // Statut de validation du champ
                            help={errors.city} // Message d'erreur affiché à côté du champ en cas d'erreur
                        >
                            <Input prefix={<FaLocationDot/>}
                                   placeholder={company.city}
                                   variant='filled'
                                   size="large"
                                //onChange={}
                            />
                        </Form.Item>
                    </Col>
                    <Col md={{flex: '50%'}} xs={{flex: '100%'}} sm={{flex: '100%'}} className={'text-center'}>
                        <Form.Item
                            name='logoFile'
                            wrapperCol={{span: 24}}
                            hasFeedback
                            className={'px-5'}

                            validateStatus={errors.isJpgOrPng || errors.isLt2M ? 'error' : ''} // Statut de validation du champ
                            help={errors.isJpgOrPng || errors.isLt2M} // Message d'erreur affiché à côté du champ en cas d'erreur
                        >
                            {/*// This upload field has a specific class wich in the output.css file. search for .ant-upload, .ant-upload-select*/}
                            <Upload
                                name="logoFile"
                                listType="picture-card"
                                accept="image/png, image/jpeg"
                                maxCount={1}
                                fileList={[]}
                                beforeUpload={beforeUpload}
                                onChange={handleChange}
                                status={errors.logoFile ? 'error' : 'done'}
                                style={{border: '1px solid red'}}
                            >
                                {imageUrl ? (
                                    <img
                                        src={imageUrl}
                                        alt="logoFile"
                                        style={{
                                            width: '100%',
                                        }}
                                    />
                                ) : (
                                    /* If company.logoUrl set the logo set in the API response, else set the upload button*/
                                    company.logoUrl ?

                                    <img
                                        src={`${process.env.REACT_APP_URL}${company.logoUrl}`}
                                        alt="logoFile"
                                        style={{
                                            width: '100%',
                                        }}
                                    /> : uploadButton
                                )}
                            </Upload>
                        </Form.Item>
                    </Col>


                </Row>
            </Form>
        </>
    );
}

export default FormUpdateCompany;