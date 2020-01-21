import React, { useState, useEffect } from "react";
import { Layout, Menu } from 'antd';
import { isAuthenticated,  getUser} from "../auth";
import { Link, withRouter } from "react-router-dom";
import { getMyInterviews } from "../core/apiCore";
import Layout2 from "../core/Layout";
import Menu2 from "../core/Menu";
import { getUsers } from "../admin/apiAdmin";
import { readStudent, getStudents } from "../core/apiCore";
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

  const UserLayout= React.memo(({ history, children }) => {
      const {
          user: { _id, name, email, role}
      } = isAuthenticated();

        const { user } = isAuthenticated();
        const [ likedstudents, setLikedstudents ] =  useState([]);


        const [users, setUsers] = useState([]);

        const loadUsers = () => {
            getUsers().then(data => {
                if (data.error) {
                    console.log(data.error);
                } else {
                    setUsers(data);
                }
            });
        };

        const init = userId => {
            getUser(userId).then(data => {
                setLikedstudents(data.liked_students);
            });
            loadInterviews();
            loadUsers();
        };

        const [ interviews, setInterviews] = useState([]);

        const loadInterviews = () => {
            getMyInterviews(user._id).then(data => {
                if (data.error) {
                    console.log(data.error);
                } else {
                    setInterviews(data);
                }
            });
        };


        useEffect(() => {
            init(user._id);
        }, []);

      return (
        <div>
          <Menu2/>
          <Content style={{ margin: '0px 0px' }}>
            <Layout style={{ margin: '1px 0', background: '#fff' }}>
            <Sider width={200} style={{ background: '#fff', padding: '20px 0' }}>

                  <div className="b black pl4 pa2 f5 f5-ns mr3 mr4-ns">My Pipeline</div>
                  <Link
                        className="nav-link"
                        style={isActive(history, "/user/students")}
                        to="/user/students" className="link dim dark-gray pl4 pa2 f6 f6-ns dib mr3 mr4-ns"
                    >All Saved Students ({likedstudents.length})</Link>

                    <Link
                          className="nav-link"
                          style={isActive(history, "/user/interviews")}
                          to="/user/interviews" className="link dim dark-gray pl4 pa2 f6 f6-ns dib mr3 mr4-ns"
                      >All Interviews ({interviews.length})</Link>
                      <div className="b pl4 pa2 f6 f6-ns mt3 mr3 mr4-ns">Others</div>

                      <Link
                            className="nav-link"
                            style={isActive(history, "/user/dashboard")}
                            to="/user/dashboard" className="link dim dark-gray pl4 pa2 f6 f6-ns dib mr3 mr4-ns"
                        >Settings</Link>
              </Sider>
              <Content style={{ padding: '0 24px', minHeight: "100vh" }}>
              {children}
              </Content>
            </Layout>
          </Content>
          </div>
  );
});

export default withRouter(UserLayout);
