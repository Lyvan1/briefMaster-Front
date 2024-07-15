import React, {useState} from 'react'
import SignUp from '../../components/Auth/Signup/SignUp'
import Login from '../../components/Auth/Login/Login'
import {Button, Layout, Tag} from 'antd'
import dataProvider from '../../dataProvider/dataProvider'

const Welcome = () => {

    // state for handle witch component will be displayed either Login or SignUp
    const [displayLogin, setDisplayLogin] = useState(true);

    const spanText = displayLogin ? 'Vous n\'avez pas encore de compte?' : 'Vous disposez d\'un compte';
    const tagText = displayLogin ? 'Inscrivez - vous' : 'Connectez-vous';

    return (
        <>
            <Layout style={{
                display: 'flex',
                justifyContent: 'center',
                background: 'none',
                alignItems: 'center',

            }}>

                <div style={{width: '90%', alignSelf: 'center'}}>
                    {
                        displayLogin ? <Login/> : <SignUp/>
                    }
                </div>

            <div className=" container flex  justify-end items-end mx-auto mt-3">
                <span className="text-white mr-3"> {spanText}</span>
                <a>
                    <Tag onClick={() => setDisplayLogin(prevState => !prevState)}>
                        {tagText}
                    </Tag>
                </a>
            </div>  </Layout>
        </>
    )
}

export default Welcome