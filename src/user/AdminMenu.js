import React from "react";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { Layout, Menu, Icon } from 'antd';
const { Header, Content, Footer, Sider } = Layout;

const AdminMenu = ({children}) => {
    const {
        user: { _id, name, email, role }
    } = isAuthenticated();

    const adminLinks = () => {
        return (
            <div className="card">
                <h4 className="card-header">Admin Links</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link className="nav-link" to="/admin/create/student">
                            Create Student
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link className="nav-link" to="/admin/students">
                            View Students
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link className="nav-link" to="/admin/products">
                            Manage Products
                        </Link>
                    </li>
                </ul>
            </div>
        );
    };

    const adminInfo = () => {
        return (
            <div className="card mb-5">
                <h3 className="card-header">User Information</h3>
                <ul className="list-group">
                    <li className="list-group-item">{name}</li>
                    <li className="list-group-item">{email}</li>
                    <li className="list-group-item">
                        {role === 1 ? "Admin" : "Registered User"}
                    </li>
                </ul>
            </div>
        );
    };

    return (
        <Layout>
          <Sider
            style={{
              overflow: 'auto',
              height: '100vh',
              position: 'fixed',
              left: 0,
            }}
          >
      <div className="logo" />
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1">
            <Icon type="user" />
            <span className="nav-text">Dashboard</span>
            <Link to="/admin/Dashboard" />
          </Menu.Item>
        <Menu.Item key="2">
          <Icon type="bar-chart" />
          <span className="nav-text">Students</span>
          <Link to="/admin/students" />
        </Menu.Item>
        <Menu.Item key="7">
          <Icon type="team" />
          <span className="nav-text">Users</span>
        </Menu.Item>
        <Menu.Item key="8">
          <span className="nav-text">Return Home</span>
          <Link to="/" />
        </Menu.Item>
      </Menu>
    </Sider>
    <Layout style={{ marginLeft: 200 }}>
     <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
       <div style={{ padding: 24, background: '#fff' }}>
       {children}
       </div>
     </Content>
     <Footer style={{ textAlign: 'center' }}>ASIA to JAPAN</Footer>
   </Layout>
  </Layout>
    );
};

export default AdminMenu;
