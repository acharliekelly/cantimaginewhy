import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import ContactLinks from '../ContactLinks';
import Logo from '../Logo/';
import Menu from '../Menu';
import { Breakpoint } from 'react-socks';

const Header = props => (
  <div className="menu-wrapper">
    <Navbar bg="light" className="justify-content-between">
      <Breakpoint md up>
        <Navbar.Brand>
          <Logo {...props} />
        </Navbar.Brand>
      </Breakpoint>
      

      <Container className="justify-content-end">
        <Breakpoint md down>
          <Menu type="drop" {...props} />
        </Breakpoint>
        <Breakpoint lg up>
          <Menu type="nav" {...props} />
        </Breakpoint>
      </Container>
        
      <Container className="justify-content-end">
        <Breakpoint sm down>
          <ContactLinks displayType="icon" size="lg" group="head" />
        </Breakpoint>
        <Breakpoint md up>
          <ContactLinks displayType="icon" size="2x" horizontal="lg" group="head" />
        </Breakpoint>
      </Container>
    </Navbar>
  </div>
);

export default Header;
