import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { withRouter } from "react-router-dom";
import { signout, isAuthenticates } from "../auth";
const NavMugicha = ({ children,  history }) => {
  
    return (
        <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand href="/mugicha">麦茶</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">

          <Nav.Link href="/mugicha"> Current Interviews</Nav.Link>
          <Nav.Link href="/mugicha/companies">Companies</Nav.Link>
          <Nav.Link href="/mugicha/students">Students</Nav.Link>
          <Nav.Link href="/mugicha/past"> Past Interviews</Nav.Link>
         </Nav>
        <Nav>
          <button className="btn btn-light"
                  onClick={() =>
                          signout(() => {
                              history.push("/");})}
                  >  Log Out
            </button>
        </Nav>
      </Navbar.Collapse>
      </Navbar>
      <Container>
        <div style={{fontSize: "12px", marginTop: "1rem", marginBottom: "2rem"}}>
        {children}
        </div>
      </Container>
      </>
    );
  }
  
  export default withRouter(NavMugicha);