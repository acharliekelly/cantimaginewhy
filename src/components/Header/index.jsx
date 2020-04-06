import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import ContactLinks from '../ContactLinks';
import Logo from '../Logo/';
import Menu from '../Menu';

const Header = props => (
  <div className="menu-wrapper">
    <Navbar bg="light" className="justify-content-between" expand="md">
      <Navbar.Brand>
        <Logo {...props} />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="menu-content" />
      <Navbar.Collapse id="menu-content">
        <Container className="justify-content-end">
          <Menu {...props} />
        </Container>
        <Container className="justify-content-end">
          <ContactLinks 
            displayType="icon" 
            size="2x" 
            horizontal="sm" 
            group="head" />
        </Container>
      </Navbar.Collapse>
    </Navbar>
  </div>
);

export default Header;
