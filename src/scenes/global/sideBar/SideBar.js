import React, { useState } from 'react'
import { Layout, Menu } from 'antd'
import { items } from './MenuItems'
import {useLocation, useNavigate} from "react-router-dom";
import './sidebarStyle.css';
import advertising from './advertising.png';

const { Sider } = Layout

const SideBar = () => {

    const navigate = useNavigate();

  // Handle the state of the sideBar (collapsed or not)
  const [collapsed, setCollapsed] = useState(false);

    const location = useLocation();
  const handleClick =({key}) =>{
      navigate(key);
  }

  return (

      <Sider width={200}
             collapsible
             breakpoint="lg"
             collapsedWidth={collapsed ? '0' : undefined}
          // onBreakpoint={(broken) => {
          //   console.log('onBreakPoint', broken)
          // }}
             collapsed={collapsed}
             onCollapse={(value) => {
                 setCollapsed(value)
             }}
             className={collapsed ? 'sidebar-collapsed' : 'sidebar-expanded'}
             style={{
                 zIndex: 2,
                 height: "100vh",
                 position: "sticky",
                 top: 0,
                 left: 0,
             }}

      >
          <div style={{position:'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop:'20px', marginBottom:'30px'}}>
              <img width='60%' src={advertising} alt="logo"/>
          </div>
          <Menu
              theme={'dark'}
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{ width: '100%', borderRight: 0,}}
              items={items}
              selectedKeys={location.pathname}
              onClick={handleClick}

          />
      </Sider>

  )
}

export default SideBar