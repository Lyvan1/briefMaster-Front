import React, {useContext, useEffect, useState} from 'react'
import {Button, Col, Form, Input, message, Row} from 'antd'
import {FaUser, FaLock} from 'react-icons/fa6'
import dataProvider from '../../../dataProvider/dataProvider'
import {object, string} from 'yup'
import {useNavigate} from 'react-router-dom'
import AuthContext from '../../../context/authProvider/AuthProvider'
import {useDispatch, useSelector} from 'react-redux'
import {login, setCurrentUser} from '../../../store/reducer/auth';
import {jwtDecode} from 'jwt-decode';

const Login = () => {
    const dispatch = useDispatch();
    const test = useSelector(state => state.auth.currentUser);

    const {isLoggedIn, setIsLoggedIn} = useContext(AuthContext)
    const navigate = useNavigate()

    // État local pour stocker les erreurs de validation
    const [errors, setErrors] = useState({})


    // Définition du schéma de validation avec Yup
    const formData = object({
        email: string().email('Adresse e-mail invalide').required('Veuillez entrer votre e-mail'),
        password: string().required('Veuillez entrer votre mot de passe'),
    })

    const handleLogin = async (values) => {

        try {
            const validatedData = await formData.validate(values, {abortEarly: false});
            console.log('Données soumises validées:', validatedData);


            const response = await dataProvider.login(values)

            if (response.data) {
                // call dispatch function for change the state for isLoggedIn  define in the store by using the reducer
                dispatch(login());
                dispatch(setCurrentUser(jwtDecode(localStorage.getItem('token'))))
                //Navigate to home
                navigate('/');
            } else {

                setErrors({message: response.message})
            }

        } catch (error) {
            // if validate data or login failed
            const errorsObj = {}
            if (error && error.inner) {
                error.inner.forEach((error) => {
                    errorsObj[error.path] = error.message
                })
                setErrors(errorsObj)

            }
        }
    }

    useEffect(() => {

        // Afficher le message d'erreur s'il existe
        if (errors && errors.message === 'Invalid credentials.') {
            message.open({
                type: 'error',
                content: errors.message,
                duration: 3,
            });
        }
    }, [errors]);

    return (
        <Row justify={'center'} align={'middle'} className={'bg-white'}>

            <Col md={{flex: '50%', order: '1'}} xs={{flex: '100%', order: '2'}} sm={{flex: '100%', order: '2'}}>
                <div
                    className='h-96 bg-cover bg-center bg-no-repeat '
                    style={{
                        backgroundImage: 'url("https://cdn.pixabay.com/photo/2020/02/11/10/24/sea-4839056_1280.jpg")',
                        height: '400px',
                    }}
                ></div>
            </Col>

            <Col md={{flex: '50%', order: '2'}} xs={{flex: '100%', order: '1'}}
                 sm={{flex: '100%', order: '1'}} className={'justify-center'}>
                <div className={'justify-center mt-5'}>
                    <div>
                        <h1
                            className={'text-5xl font-extrabold text-center mb-12'}>Login</h1>
                    </div>
                </div>

                <Form
                    name='login'
                    onFinish={handleLogin} // Appel de la fonction de rappel lors de la soumission du formulaire
                    initialValues={{remember: true}}
                    autoComplete='on'
                    preserve
                >

                    <Form.Item
                        name='email'
                        wrapperCol={{span: 24}}
                        hasFeedback
                        validateStatus={errors && errors.email ? 'error' : ''} // Statut de validation du champ
                        help={errors && errors.email ? errors.email : null}// Message d'erreur affiché à côté du champ en cas d'erreur
                        className={'px-5'}
                    >
                        <Input prefix={<FaUser/>} placeholder='Email' size='large'/>
                    </Form.Item>


                    <Form.Item
                        name='password'
                        wrapperCol={{span: 24}}
                        hasFeedback
                        validateStatus={errors && errors.password ? 'error' : ''} // Statut de validation du champ
                        help={errors && errors.password ? errors.password : null} // Message d'erreur affiché à côté du champ en cas d'erreur
                        className={'px-5'}
                    >
                        <Input.Password prefix={<FaLock/>} placeholder='Password' size='large'/>
                    </Form.Item>


                    <div>
                        <div className={'text-right'}>
                            <Form.Item className={'px-5'}>
                                <Button type='primary' htmlType='submit'
                                        className='login-form-button'>
                                    Submit
                                </Button>
                            </Form.Item>
                        </div>
                    </div>

                </Form>

            </Col>
        </Row>)
}

export default Login