import React, {useEffect} from 'react'
import {Avatar, Button, Layout, Tooltip, Space, Card, Row, Col} from 'antd'
import {UserOutlined} from "@ant-design/icons";
import {FaRightToBracket, FaGear} from "react-icons/fa6";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../../store/reducer/auth";
import dataProvider from "../../../dataProvider/dataProvider";
import Meta from "antd/es/card/Meta";
import {FloatButton} from 'antd';
import CustomBreadCrumb from "../breadcrumb/CustomBreadCrumb";

const {Header, Content} = Layout


const TopBar = () => {

    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.auth.currentUser);

    const handleLogout = () => {
        // call the logout function from the dataProvider
        // set auth.state to false in the reducer by using dispatch
        dispatch(logout());
        dataProvider.logout()
    }
    const cardHeaderStyle = {
        border: 0 // Supprimer la bordure du header
    };

    const currentUserData = (
        <Card
            style={{padding: 0, margin: 0, background: 'none', border: 'none'}}
            styles={{body: {padding: '20px 0 10px 0 '}}}
            title={currentUser.username}
        >
            <Meta

                title={
                    <Button
                        onClick={() => alert('Available soon.')}
                        className={'border-none bg-none'}
                        size={'large'}
                        icon={<FaGear/>}
                    >
                        Settings
                    </Button>
                }
                description={
                    <Button
                        onClick={handleLogout}
                        className={'border-none bg-none'}
                        size={'large'}
                        icon={<FaRightToBracket/>}
                        danger={true}
                    >
                        Logout
                    </Button>
                }
            />

        </Card>
    )
    return (
        <Header style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'end',
            position: 'sticky',
            top: 0,
            zIndex: 1,
            width: '100%',
            height: '30px',
            padding: '0 10px'

        }}>
            <Row justify={'start'} align={'middle'} style={{ width:'100%', overflow: 'hidden'}}>
                <Col  span={12} md={{flex: '50%'}} xs={{flex: '100%'}} sm={{flex: '100%'}} >
                    <CustomBreadCrumb/>
                </Col>

                <Col   span={12} md={{flex: '50%'}} xs={{flex: '100%'}} sm={{flex: '100%'}} align={'end'}>
                    <Tooltip placement="leftBottom" title={currentUserData} trigger={['click']} color={'white'}>
                        <Button size={'small'} shape='circle' icon={<UserOutlined/>}/>
                    </Tooltip>
                </Col>
            </Row>

        </Header>
    )
}

export default TopBar