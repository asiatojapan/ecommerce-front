import React, { Fragment } from "react";
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import { isAuthenticated } from "../auth";
import { Link, withRouter } from "react-router-dom";
import Layout2 from "../core/Layout";
import Menu2 from "../core/Menu"
import 'antd/dist/antd.css';
import "../styles.css";
const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

const isActive = (history, path) => {
    if (history.location.pathname === path) {
        return { color: "#1890ff" };
    } else {
        return { color: "#111" };
    }
};

  const UserLayout= ({ history, children }) => {
      const {
          user: { _id, name, email, role }
      } = isAuthenticated();

      return (
        <div>
          <Menu2/>
          <Content style={{ padding: '20px 0' }}>
            <Layout style={{ padding: '24px 0', background: '#fff' }}>
              <Sider width={200} style={{ background: '#fff' }}>

                <Link
                      className="nav-link"
                      style={isActive(history, "/user/dashboard")}
                      to="/user/dashboard" className="link dim dark-gray pl4 pa2 f6 f6-ns dib mr3 mr4-ns"
                  >Dashboard</Link>

                  <Link
                        className="nav-link"
                        style={isActive(history, "/user/likes")}
                        to="/user/likes" className="link dim dark-gray pl4 pa2 f6 f6-ns dib mr3 mr4-ns"
                    >My Students</Link>

              </Sider>
              <Content style={{ padding: '0 24px', minHeight: "100vh" }}>
              {children}
              </Content>
            </Layout>
          </Content>
          </div>
  );
};

export default withRouter(UserLayout);
