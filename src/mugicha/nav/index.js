import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import NavDropdown from 'react-bootstrap/NavDropdown';

const NavMugicha = ({ children }) => {
  
    return (
        <>
      <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
      <Navbar.Brand href="/mugicha">麦茶</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/mugicha/companies">Companies</Nav.Link>
          <Nav.Link href="/mugicha/students">Students</Nav.Link>
         </Nav>
        <Nav>
          <Nav.Link href="/">Main</Nav.Link>
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
  
  export default NavMugicha;