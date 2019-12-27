import React, { Fragment } from "react";
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import { Link, withRouter } from "react-router-dom";
import Layout2 from "../core/Layout";
import 'antd/dist/antd.css';
import "../styles.css";
const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

const UserLayout = ({children}) => (
  <Layout2>
  <Layout>
    <Content style={{ padding: '0 50px' }}>
      <Layout style={{ padding: '24px 0', background: '#fff' }}>
        <Sider width={200} style={{ background: '#fff' }}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%' }}
          >


          <Menu.Item>
            <Link to="/user/dashboard">Dashboard</Link>
          </Menu.Item>
              <Menu.Item key="2">
              <Link to="/user/likes">My Students</Link>
              </Menu.Item>


          </Menu>
        </Sider>
        <Content style={{ padding: '0 24px', minHeight: 280 }}>
        {children}
        </Content>
      </Layout>
    </Content>
  </Layout>
</Layout2>
);

export default UserLayout;
