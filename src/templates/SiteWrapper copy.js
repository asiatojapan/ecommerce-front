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

const SiteWrapper = ({ history, children }) => (
  <Fragment> 
      <nav>
      <div class="nav-mobile">
        <a id="nav-toggle" href="#!"><span></span></a>
      </div>
      <ul class="nav-list">
        <li><a href="#!">Home</a></li>
        <li><a href="#!">About</a></li>
        <li>
          <a href="#!">Services</a>
          <ul class="nav-dropdown">
            <li><a href="#!">Web Design</a></li>
            <li><a href="#!">Web Development</a></li>
            <li><a href="#!">Graphic Design</a></li>
          </ul>
        </li>
        <li><a href="#!">Pricing</a></li>
        <li><a href="#!">Contact</a></li>
      </ul>
    </nav>
      <div style={{padding: "2rem 0rem"}}>
      {children}
      </div>
</Fragment>
)

export default withRouter(SiteWrapper);
