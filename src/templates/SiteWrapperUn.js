import React, { Fragment } from "react";
import { withRouter } from "react-router-dom";
import { signout, isAuthenticates } from "../auth";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Dropdown from 'react-bootstrap/Dropdown';
import logo from './Logo.png'
import { connect } from "react-redux";
import { logout } from "../actions/session";

const mapStateToProps = ({ session }) => ({
  session
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
});

const SiteWrapperUn = ({ logout, session, history, children }) => (
  <Fragment> 
    {isAuthenticates() && (
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
              {isAuthenticates() && session.role === 0 && (
              <Fragment> 
            <Nav.Link href={`/`} >Home </Nav.Link>
            { isAuthenticates() && (session.round !== "Phase I" || session.round === "Phase II") && 
            ( <Nav.Link href="/user/interviews" >面接予定</Nav.Link>  )}
             </Fragment>
             )}
          </Nav>
        
          <Nav>  
 
          {isAuthenticates() && session.role === 1 && (
          <NavDropdown title={session.name} id="basic-nav-dropdown">
              <Dropdown.Header style={{fontWeight: "700", color:"#000"}}> {session.name} </Dropdown.Header>
              <NavDropdown.Divider />
              <NavDropdown.Item href={`/profile/${session._id}`} >Account</NavDropdown.Item>
              <NavDropdown.Item href="/admin/students">All Students</NavDropdown.Item>
              <NavDropdown.Item href="/admin/users">All Users</NavDropdown.Item>
              <NavDropdown.Item href="/admin/interviews">All Interviews</NavDropdown.Item>
              <NavDropdown.Divider />
              <Dropdown.Header> <button className="btn btn-outline-primary"
                  onClick={() =>
                          signout(() => {
                              history.push("/");})}
                  >  Log Out
            </button>
            </Dropdown.Header>
            </NavDropdown>
            )}
            </Nav>
            {session.role !== 1 && (<Nav style={{margin: "0px 10px"}}>{session.name}</Nav>)}
            {isAuthenticates() && session.role !== 2 && (
            <a className="unlikeBtn smaller" href="/checkout/preview" style={{marginRight: "10px"}}> 検討リスト
            </a>)}
            <button className="likeBtn smaller"
                  onClick={() =>
                          signout(() => {
                              history.push("/");})}
                  >  Log Out
            </button>
        </Navbar.Collapse>
      </Navbar> )}
      <div style={{padding: "2rem 0rem 3rem 0rem"}}>
      {children}
      </div>
</Fragment>
)

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(SiteWrapper));