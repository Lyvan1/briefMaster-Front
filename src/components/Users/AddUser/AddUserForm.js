import React, {useEffect, useState} from 'react';
import {Col, Form, Input, message, Row, Select, Upload} from "antd";
import {object, string, number, typeError, addMethod, mixed, email} from 'yup'
import {FaUser} from "react-icons/fa6";
import {LoadingOutlined, PlusOutlined} from "@ant-design/icons";
import userProvider from "../../../dataProvider/userProvider";

function AddUserForm(props) {
    const {data, setData, errors, setErrors, companiesList, options, handleSearch} = props;


    //State for handle errors

    const [touchedField, setTouchedField] = useState({});
    const [file, setFile] = useState({});
    const [imageUrl, setImageUrl] = useState();
    const [loading, setLoading] = useState();
    const [rolesList, setRolesList] = useState({})



    //Schema de validations
    const firstnameSchema = string().required('firstname is required.').min(3, 'Firstname must be at least 3 characters long.');
    const lastnameSchema = string().required('lastname is required').min(3, 'Firstname must be at least 3 characters long.');
    const emailSchema = string().required('email is required.').email('Please enter a valid email.');
    const passwordSchema = string()
        .required('password is required.')
        .min(8, 'Password must be at least 8 characters long.')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&\/]).{8,}$/, 'Password must have at least 1 Uppercase Letter, 1 Lowercase letter, 1 special characters');

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

    const getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
        console.log('reader', reader);
    };

    // A chaque changement d'image
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
            setData(prevData => ({...prevData, avatarFile: info.fileList[0].originFileObj})); // Définir le fichier uniquement s'il n'y a pas d'erreur
        });
        console.log('image url', imageUrl);
    };

    const generateRandomCharacter = (characters) => {
        const randomIndex = Math.floor(Math.random() * characters.length);
        return characters[randomIndex];
    }

    function getRandomInt(min, max) {
        // Inclut les bornes min et max
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const generatePassword = () => {

        const lowerCase = 'abcdefghijklmnopqrstuvwxyz';
        const upperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const digits = '01233456789';
        const specialCharacters = '@$!%*&/';
        const allCharacters = lowerCase + upperCase + specialCharacters + digits;

        let password = '';

        // Assurer que le mot de passe contient au moins une lettre minuscule, majuscule, un chiffre et un caractère spécial
        password += generateRandomCharacter(lowerCase);
        password += generateRandomCharacter(upperCase);
        password += generateRandomCharacter(digits);
        password += generateRandomCharacter(specialCharacters);

        // Remplir le reste du mot de passe avec des caractères aléatoires
        for (let i = 0; i < getRandomInt(8, 15); i++) {
            password += generateRandomCharacter(allCharacters);
        }

        // Mélanger le mot de passe pour éviter que les premiers caractères soient toujours les mêmes types
        password = password.split('').sort(() => 0.5 - Math.random()).join('');

        return password;
    }

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

    const inputCompany = props.company
        ? (
            <Form.Item
                name='company'
                wrapperCol={{span: 24}}
                onChange={(e) => handleBlur('company', e.target.value)}
                onBlur={(e) => handleBlur('company', e.target.value)}
                hasFeedback
                validateStatus={errors.company ? 'error' : (touchedField.company ? 'success' : '')}
                help={errors.company}

            >
                <Input
                    size={'large'}
                    prefix={<FaUser/>}
                    placeholder={'Company'}
                    disabled
                />
            </Form.Item>
        )
        : (

            <Form.Item
                name='company'
                hasFeedback
                validateStatus={errors.company ? 'error' : (touchedField.company ? 'success' : '')}
                help={errors.company}
            >
                <Select
                    allowClear
                    placeholder="Select a company"
                    style={{width: '100%'}}
                    showSearch
                    optionFilterProp="label"
                    options={options}
                    onSearch={handleSearch}
                    onChange={(companyId) => handleBlur('company', companyId)}
                    variant={'outlined'}
                    size={'large'}
                    suffixIcon={<FaUser/>}
                    notFoundContent={companiesList.length === 0 ? 'No companies found' : ''}
                />
            </Form.Item>
        );

    // Effet secondaire pour mettre à jour les données lors du changement de props.company
    useEffect(() => {
        if (props.company) {
            setData(prevData => ({
                ...prevData,
                password: generatePassword(),
                company: '/briefApi/companies/' + props.company.id
            }));
        } else {
            setData(prevData => ({
                ...prevData,
                password: generatePassword(),
            }));
        }
    }, [props.company]);

    const getRoles = async () => {
        try {
            const rolesListData = await userProvider.getRolesList();

            let newRolesList = [];

            rolesListData.items.forEach(item => {
                newRolesList.push({ value: item.id, label: item.name });
            });

            // Mettre à jour l'état rolesList avec le tableau accumulé des nouveaux rôles
            setRolesList(newRolesList);



        } catch (error) {
            console.log(error);
        }
    };


    useEffect(() => {
         getRoles();
    }, []);


    const handleBlur = async (fieldName, value) => {
        /* if(fieldName === 'company') {
             setData(prevData => ({...prevData, [fieldName]: `/briefApi/companies/${value}`}));
         }*/

        setTouchedField(prevTouchedField => ({...prevTouchedField, [fieldName]: true}));
        let fieldSchema;
        console.log('test', fieldName, value)
        switch (fieldName) {
            case 'firstname':
                fieldSchema = firstnameSchema;
                break;
            case 'lastname':
                fieldSchema = lastnameSchema;
                break;
            case 'email':
                fieldSchema = emailSchema;
                break;
            case 'password':
                setData(prevData => ({...prevData, [fieldName]: value}));
                fieldSchema = passwordSchema;
                break;
            case 'company':
                setData(prevData => ({...prevData, [fieldName]: '/briefApi/companies/' + value}));
                return;
            case 'roles':
                setData(prevData => ({...prevData, [fieldName]: '/briefApi/users_roles/' + value}));
                return;
            default:
                return;
        }


        try {

            await fieldSchema.validate(value);
            setErrors(prevErrors => ({...prevErrors, [fieldName]: null}));

            const validatedData = {...data, [fieldName]: value};
            setData(validatedData);
        } catch (validationError) {
            setErrors(prevErrors => ({...prevErrors, [fieldName]: validationError.message}));
        }

    }

    /*   useEffect(() => {
           console.log('Data updated:', data);
       }, [data]);*/

    return (
        <>
            <Form
                name='addUser'
                autoComplete='on'
                preserve
                style={{width: '100%'}}
                initialValues={{password: generatePassword(), company: props.company ? props.company.name : ''}}
            >
                <Row justify={'center'} align={'middle'}>
                    <Col span={24} md={{flex: '50%'}} xs={{flex: '100%'}} sm={{flex: '100%'}}>
                        <Form.Item
                            name='avatarFile'
                            hasFeedback
                            className={'px-5'}
                            validateStatus={errors.isJpgOrPng || errors.isLt2M ? 'error' : ''} //Status de valiation du champ
                            help={errors.isJpgOrPng || errors.isLt2M} //Message d'erreur affiché
                        >
                            {/*// This upload field has a specific class wich in the output.css file. search for .ant-upload, .ant-upload-select*/}
                            <Upload
                                name="avatarFile"
                                listType="picture-card"
                                accept="image/png, image/jpeg"
                                maxCount={1}
                                fileList={[]}
                                beforeUpload={beforeUpload}
                                onChange={handleChange}
                                status={errors.avatarFile ? 'error' : 'done'}
                                style={{border: '1px solid red'}}
                            >
                                {imageUrl ? (
                                    <img
                                        src={imageUrl}
                                        alt="avatarFile"
                                        style={{
                                            width: '100%',
                                        }}
                                    />
                                ) : (
                                    uploadButton
                                )}
                            </Upload>
                        </Form.Item>
                    </Col>
                </Row>
                <Row justify={'center'} align={'middle'}>
                    <Col span={24} md={{flex: '50%'}} xs={{flex: '100%'}} sm={{flex: '100%'}}>
                        <Form.Item
                            name='firstname'
                            wrapperCol={{span: 24}}
                            onChange={(e) => handleBlur('firstname', e.target.value)}
                            onBlur={(e) => handleBlur('firstname', e.target.value)}
                            hasFeedback
                            validateStatus={errors.firstname ? 'error' : (touchedField.firstname ? 'success' : '')}
                            help={errors.firstname}
                            className={'px-5'}
                        >
                            <Input size={'large'} prefix={<FaUser/>} placeholder={'Firstname'}/>
                        </Form.Item>
                    </Col>
                    <Col span={24} md={{flex: '50%'}} sm={{flex: '100%'}} xs={{flex: '100%'}}>
                        <Form.Item
                            name='lastname'
                            wrapperCol={{span: 24}}
                            onChange={(e) => handleBlur('lastname', e.target.value)}
                            onBlur={(e) => handleBlur('lastname', e.target.value)}
                            hasFeedback
                            validateStatus={errors.lastname ? 'error' : (touchedField.lastname ? 'success' : '')}
                            help={errors.lastname}
                            className={'px-5'}
                        >
                            <Input size={'large'} prefix={<FaUser/>} placeholder={'Lastname'}/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24} md={{flex: '50%'}} xs={{flex: '100%'}}>
                        <Form.Item
                            name='email'
                            wrapperCol={{span: 24}}
                            onChange={(e) => handleBlur('email', e.target.value)}
                            onBlur={(e) => handleBlur('email', e.target.value)}
                            hasFeedback
                            validateStatus={errors.email ? 'error' : (touchedField.email ? 'success' : '')}
                            help={errors.email}
                            className={'px-5'}
                        >
                            <Input size={'large'} prefix={<FaUser/>} placeholder={'Email'}/>
                        </Form.Item>
                    </Col>
                    <Col span={24} md={{flex: '50%'}} xs={{flex: '100%'}}>
                        <Form.Item
                            name='password'
                            wrapperCol={{span: 24}}
                            onChange={(e) => handleBlur('password', e.target.value)}
                            onBlur={(e) => handleBlur('password', e.target.value)}
                            hasFeedback
                            validateStatus={errors.password ? 'error' : (touchedField.password ? 'success' : '')}
                            help={errors.password}
                            className={'px-5'}
                        >
                            <Input addonBefore='password' size={'large'} addonAfter={<FaUser/>} placeholder={'Password'}
                                   variant={touchedField.password ? 'outlined' : 'filled'}/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row justify={'center'} align={'middle'}>
                    <Col span={24} md={{flex: '50%'}} xs={{flex: '100%'}} className={'px-5'}>

                        {inputCompany}

                    </Col>
                    <Col span={24} md={{flex: '50%'}} xs={{flex: '100%'}} className={'px-5'}>
                        <Form.Item
                            name='roles'
                            hasFeedback
                            validateStatus={errors.roles ? 'error' : (touchedField.roles ? 'success' : '')}
                            help={errors.roles}
                        >
                            <Select
                                allowClear
                                placeholder='Select at least one role'
                                style={{width: '100%'}}
                                showSearch
                                optionFilterProp='label'
                                options={rolesList}
                                onSearch={handleSearch}
                                onSelect={(roleValue) => handleBlur('roles', roleValue)}
                                variant={'outlined'}
                                size={'large'}
                                suffixIcon={<FaUser/>}
                            />
                        </Form.Item>
                    </Col>

                </Row>
            </Form>
        </>
    );
}

export default AddUserForm;