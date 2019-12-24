import React, { Fragment } from "react";
import Menu2 from "./Menu";
import { Layout, Menu, Breadcrumb } from 'antd';
import 'antd/dist/antd.css';
import "../styles.css";

const { Header, Content, Footer } = Layout;

const Layout2 = ({children}) => (
  <Layout className="layout2">
  <Menu2 />
    <Content style={{ padding: '0 50px' }}>
      <div style={{ background: '#fff', paddingLeft: 200, paddingRight: 200, paddingTop: 20, paddingBottom: 20, minHeight: 980 }}>{children}</div>
    </Content>
    <Footer style={{ borderTop: "1px solid #eee", background: '#fff', textAlign: 'center' }}>ASIA to JAPAN</Footer>
  </Layout>
);

export default Layout2;
