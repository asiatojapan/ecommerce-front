import React, { Fragment } from "react";
import { signout, isAuthenticated } from "../auth";
import { Link, withRouter } from "react-router-dom";
import { Layout, Menu, Icon } from 'antd';
import Menu2 from "../core/Menu";
import "../styles.css";
const { Header, Content, Footer, Sider } = Layout;

const isActive = (history, path) => {
    if (history.location.pathname === path) {
        return { color: "#1890ff" };
    } else {
        return { color: "#111" };
    }
};


const AdminMenu = ({ history, children }) => {
    const {
        user: { _id, name, email, role }
    } = isAuthenticated();

    return (
      <div>
        <Menu2/>
        <Content style={{ margin: '0px 0px' }}>
          <Layout style={{ margin: '1px 0', background: '#fff' }}>
            <Sider width={200} style={{ background: '#fff', padding: '20px 0' }}>
          <Link
                className="nav-link"
                style={isActive(history, "/admin/dashboard")}
                to="/admin/dashboard" className="link dim dark-gray pl4 pa2 f6 f6-ns dib mr3 mr4-ns"
            >Dashboard </Link>

          <Link
                className="nav-link"
                style={isActive(history, "/admin/students")}
                to="/admin/students" className="link dim dark-gray pl4 pa2 f6 f6-ns dib mr3 mr4-ns"
            >Students</Link>

          <Link
                className="nav-link"
                style={isActive(history, "/admin/users")}
                to="/admin/users" className="link dim dark-gray pl4 pa2 f6 f6-ns dib mr3 mr4-ns"
            >Users</Link>

            <Link
                  className="nav-link"
                  style={isActive(history, "/admin/interviews")}
                  to="/admin/interviews" className="link dim dark-gray pl4 pa2 f6 f6-ns dib mr3 mr4-ns"
              >Interviews</Link>

          <Link
                className="nav-link"
                style={isActive(history, "/admin/profile")}
                to="/admin/settings" className="link dim dark-gray pl4 pa2 f6 f6-ns dib mr3 mr4-ns"
            >Settings</Link>

            </Sider>
            <Content style={{ padding: '0 0px', minHeight: "100vh" }}>
            {children}
            </Content>
          </Layout>
        </Content>
  </div>
    );
};

export default withRouter(AdminMenu);
