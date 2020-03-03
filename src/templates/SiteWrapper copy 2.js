import React, { Fragment } from "react";
import { NavLink, withRouter, Link } from "react-router-dom";
import { signout, isAuthenticated } from "../auth";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Dropdown from 'react-bootstrap/Dropdown';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import logo from './Logo.png'
import {Avatar
} from "tabler-react";

const { user, token } = isAuthenticated();


const isActive = (history, path) => {
    if (history.location.pathname === path) {
        return { color: "#1890ff" };
    } else {
        return { color: "#111" };
    }
};

const NavDropdown = styled.a` 
  text-decoration: none;
  /* background-color: #467fcf; */
}
.dropdown-item:hover, .dropdown-item:focus {
  /* color: #16181b; */
  text-decoration: none;
  background-color: #f8f9fa;
}

`

const SiteWrapper = ({ history, children }) => (
  <Fragment> 
    {isAuthenticated() && (
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
            {isAuthenticated() && isAuthenticated().user.role === 1 && (
              <Fragment>
             <Nav.Link href="/admin/students">Students</Nav.Link>
             <Nav.Link href="/admin/users">Users</Nav.Link>
             <Nav.Link href="/admin/interviews">Interviews</Nav.Link>
             </Fragment>
             )}
          </Nav>
          <Nav>  
          <NavDropdown title={user.name} id="basic-nav-dropdown">
              <Dropdown.Header style={{fontWeight: "700", color:"#000"}}> Your Profile</Dropdown.Header>
              <NavDropdown.Divider />
              <NavDropdown.Item href={`/profile/${user._id}`} style={{ color: "#fff"}}>Account</NavDropdown.Item>
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
            <a className="resumeGradient unlikeBtn smaller" href="/checkout/preview"> 検討リスト
            </a>
        </Navbar.Collapse>
      </Navbar> )}
      <div style={{padding: "2rem 0rem"}}>
      {children}
      </div>
</Fragment>
)

export default withRouter(SiteWrapper);
