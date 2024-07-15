import React from 'react'
import {DashboardOutlined, ShopOutlined, TeamOutlined, UserOutlined, CalendarOutlined } from '@ant-design/icons';
import {Link} from "react-router-dom";
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label
  };
}

export const items = [
  getItem('Dashboard', '/', <DashboardOutlined />,),
  getItem(<Link to='/companies'>Companies</Link>, '/companies', <ShopOutlined/>,),
  //getItem('Users', '/users', <TeamOutlined/>, [getItem('Team 1', '7'), getItem('Team 2', '8')]),
  getItem('Users', '/users', <TeamOutlined/>),
  getItem('Calendar', '/calendar', <DashboardOutlined />),
  getItem('Briefs', '/briefs'),
  getItem('Scrumboard', '/scrumboard', <DashboardOutlined />),
  getItem('Contacts', '/contacts', <DashboardOutlined />),
  getItem('Administration', '11', <DashboardOutlined />),
];