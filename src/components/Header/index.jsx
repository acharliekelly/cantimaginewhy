import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

import ContactLinks from '../ContactLinks';
import Logo from '../Logo';
import Menu from '../Menu';
import { pages } from '../../config/menu';
import { Breakpoint } from 'react-socks';

/* TODO:
 * write launchGallery function
 */
const tmpLaunch = () => console.log('launching Logo gallery');

const Header = props => (
  <div className="menu-wrapper">
    <Navbar bg="light" className="justify-content-between">
      <Navbar.Brand>
        <Breakpoint xs only>
          <Logo logoSize={40} allowExpand={false} />
        </Breakpoint>
        <Breakpoint sm up>
          <Logo logoSize={80} allowExpand launchGallery={tmpLaunch} />
        </Breakpoint>
      </Navbar.Brand>
      
      {/* Main Menu */}
      <Container className="justify-content-end">
        <Breakpoint xs only>
          <Menu items={pages} minimize />
        </Breakpoint>
        <Breakpoint sm up>
          <Menu items={pages} />
        </Breakpoint>
      </Container>
        
      {/* Links */}
      <Container className="justify-content-end">
        <Breakpoint md up>
          <ContactLinks group="head" />
        </Breakpoint>
      </Container>
    </Navbar>
  </div>
);

export default Header;
