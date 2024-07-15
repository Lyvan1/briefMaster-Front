import React, {useEffect} from 'react';
import {Outlet, Navigate, useLocation} from 'react-router-dom';
import {useSelector} from "react-redux";
import {Col, Layout, Row} from "antd";
import SideBar from "../../../scenes/global/sideBar/SideBar";
import {Content} from "antd/es/layout/layout";
import TopBar from "../../../scenes/global/topBar/TopBar";
import CustomBreadCrumb from "../../../scenes/global/breadcrumb/CustomBreadCrumb";

const PrivateRoutes = () => {
    const isLoggedIn = useSelector(state => state.auth.value);

    const location = useLocation();
    const currentURL = location.pathname;

    // Récupérer ce qu'il y a après le premier /
    const afterFirstSlash = currentURL.split('/').slice(1).join('/');
    console.log('private route', isLoggedIn)
    return (
        isLoggedIn ? (
            <>
                <SideBar/>
                <Layout
                    style={{

                        background: 'radial-gradient(circle, rgba(13,96,252,1) 0%, rgba(5,75,166,1) 100%)'
                    }}>
                    <TopBar/>

                    <Content style={{
                        margin: '0 0px 0 30px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center', // Centre horizontalement
                        alignItems: 'center', // Centre verticalement


                    }}>
                        {/*  <Row justify={'start'} align={'middle'} style={{position:'sticky', top:30}}>
                            <Col align={'start'} xs={{flex: '100%'}} sm={{flex: '100%'}}
                                 md={{flex: '100%'}}>
                                <CustomBreadCrumb/>
                            </Col>

                        </Row>*/}
                        <Outlet/>
                    </Content>
                </Layout>
            </>
        ) : (
            <Navigate to={'/login'}/>
        )
    );
};

export default PrivateRoutes;