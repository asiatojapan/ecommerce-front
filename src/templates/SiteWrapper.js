import React, { Fragment } from "react";
import { NavLink, withRouter, Link } from "react-router-dom";
import { signout, isAuthenticated } from "../auth";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Dropdown from 'react-bootstrap/Dropdown';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import type { NotificationProps } from "tabler-react";
import logo from './Logo.png'

const style = {
  borderColor: "#0c0c0c"
 };

type Props = {|
  +children: React.Node,
|};

type State = {|
  notificationsObjects: Array<NotificationProps>,
|};

type subNavItem = {|
  +value: string,
  +to?: string,
  +icon?: string,
  +LinkComponent?: React.ElementType,
  +useExact?: boolean,
|};

type navItem = {|
  +value: string,
  +to?: string,
  +icon?: string,
  +active?: boolean,
  +LinkComponent?: React.ElementType,
  +subItems?: Array<subNavItem>,
  +useExact?: boolean,
|};


const { user, token } = isAuthenticated();

const adminnavBarItems: Array<navItem> = [
  {
    value: "List",
    to: "/",
    icon: "home",
    LinkComponent: withRouter(NavLink),
    useExact: true,
  },
  {
    value: "Dashboard",
    to: "/admin/dashboard",
    icon: "grid",
    LinkComponent: withRouter(NavLink),
    useExact: true,
  },
  {
    value: "Students",
    to: "/admin/students",
    icon: "list",
    LinkComponent: withRouter(NavLink),
    useExact: true,
  },
  {
    value: "Users",
    to: "/admin/users",
    icon: "user",
    LinkComponent: withRouter(NavLink),
    useExact: true,
  },
  {
    value: "Interviews",
    to: "/admin/interviews",
    icon: "box",
    LinkComponent: withRouter(NavLink),
  },
];

const navBarItems: Array<navItem> = [
  {
    value: "List",
    to: "/",
    icon: "home",
    LinkComponent: withRouter(NavLink),
    useExact: true,
  },
  {
    value: "Students",
    to: "/user/students",
    icon: "list",
    LinkComponent: withRouter(NavLink),
    useExact: true,
  },
  {
    value: "Interviews",
    to: "/user/interviews",
    icon: "box",
    LinkComponent: withRouter(NavLink),
    useExact: true,
  },
];

const accountDropdownProps = {
  avatarURL:  <span class="avatar">BM</span>,
  name: isAuthenticated() ? user.name : "" ,
  description: isAuthenticated() ? user.role === 1 ? "Admin" : "User" : "",
  options: [
    { icon: "user", value: "Profile", to: "/profile/${user._id}"},
    { icon: "settings", value: "Settings" },
    { icon: "help-circle", value: "Need help?" },
  ],
};

const isActive = (history, path) => {
    if (history.location.pathname === path) {
        return { color: "#1890ff" };
    } else {
        return { color: "#111" };
    }
};


const SiteWrapper = ({ history, children }) => (
  <Fragment>
      <Navbar expand="lg" style={{backgroundColor: "#fff", boxShadow: "0 2px 4px 0 rgba(76,76,75,.1)"}}>
        <Navbar.Brand href="/">
          <img
          alt=""
          src={logo}
          height="30"
          className="d-inline-block align-top"
        />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
  
          </Nav>
          <Nav>
          <NavDropdown title={user.name} id="basic-nav-dropdown">
              <Dropdown.Header style={{fontWeight: "700", color:"#000"}}> Your Profile</Dropdown.Header>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/user/profile">Account</NavDropdown.Item>
              <NavDropdown.Item href="/user/orders">Orders</NavDropdown.Item>
              <NavDropdown.Item href="/user/interviews">Interviews</NavDropdown.Item>
              <NavDropdown.Divider />
              <Dropdown.Header> <button className="btn btn-outline-primary"
                  onClick={() =>
                          signout(() => {
                              history.push("/");})}
                  >  Log Out
            </button>
            </Dropdown.Header>
            </NavDropdown>
            </Nav>
            <a className="btn btn-primary" href="/checkout/preview"> Your Cart
            </a>
        </Navbar.Collapse>
      </Navbar> 
      <div style={{padding: "2rem 0rem"}}>
      {children}
      </div>
</Fragment>
)

export default withRouter(SiteWrapper);
