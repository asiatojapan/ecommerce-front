import React, { Fragment } from "react";
import { Menu } from 'antd';
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth";

const isActive = (history, path) => {
    if (history.location.pathname === path) {
        return { color: "#1890ff" };
    } else {
        return { color: "#ffffff" };
    }
};

const Menu2 = ({ history }) => (
  <Menu
    theme="dark"
    mode="horizontal"
    defaultSelectedKeys={['2']}
    style={{ lineHeight: '64px' }}
  >
    <Menu.Item>
      <Link style={isActive(history, "/")} to="/">Home</Link>
    </Menu.Item>

        {isAuthenticated() && isAuthenticated().user.role === 0 && (

                <Link
                    className="nav-link"
                    style={isActive(history, "/user/dashboard")}
                    to="/user/dashboard"
                >
                    Dashboard
                </Link>
        )}

        {!isAuthenticated() && (
          <Fragment>
            <Link
                className="nav-link"
                style={isActive(history, "/signin")}
                to="/signin"
            >
                Signin
            </Link>
            <Link
                className="nav-link"
                style={isActive(history, "/signup")}
                to="/signup"
            >
                Signup
            </Link>
    </Fragment>
)}

        {isAuthenticated() && isAuthenticated().user.role === 1 && (
          <Menu.Item>
            <Link style={isActive(history, "/admin/dashboard")} to="/admin/dashboard"> Admin Dashboard</Link>
          </Menu.Item>
        )}

        {isAuthenticated() && (
            <Menu.Item>
                <span　onClick={() =>
                        signout(() => {
                            history.push("/");})}
                >  ログアウト
                </span>
          </Menu.Item>
        )}
  </Menu>

);

export default withRouter(Menu2);
