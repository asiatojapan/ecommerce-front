import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import NavDropdown from 'react-bootstrap/NavDropdown';

const NavMugicha = ({ children }) => {
  
    return (
        <>
      <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
      <Navbar.Brand href="/mugicha">麦茶</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/mugicha/companies">Companies</Nav.Link>
          <Nav.Link href="/mugicha/students">Students</Nav.Link>
         </Nav>
        <Nav>
          <Nav.Link href="/mugicha/results">Results</Nav.Link>
        </Nav>
      </Navbar.Collapse>
      </Navbar>
      <Container>
        {children}
      </Container>
      </>
    );
  }
  
  export default NavMugicha;