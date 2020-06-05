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
      {/* Only show logo on desktop */}
      <Breakpoint md only>
        <Navbar.Brand>
          <Logo {...props} />
        </Navbar.Brand>
      </Breakpoint>
      <Breakpoint lg up>
        <Navbar.Brand>
          <Logo enableEaster {...props} />
        </Navbar.Brand>
      </Breakpoint>
      

      <Container className="justify-content-end">
        {/* Menu - dropdown on xs */}
        <Breakpoint xs only>
          <Menu type="drop" {...props} />
        </Breakpoint>
        <Breakpoint sm up>
          <Menu type="nav" {...props} />
        </Breakpoint>
      </Container>
        
      <Container className="justify-content-end">
        <Breakpoint sm up>
          <ContactLinks group="head" />
        </Breakpoint>
      </Container>
    </Navbar>
  </div>
);

export default Header;
