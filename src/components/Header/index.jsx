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
      <Breakpoint xs only>
        <Navbar.Brand>
          <Logo logoSize={40} allowExpand={false} />
        </Navbar.Brand>
      </Breakpoint>
      <Breakpoint sm up>
        <Navbar.Brand>
          <Logo logoSize={80} allowExpand launchGallery={tmpLaunch} />
        </Navbar.Brand>
      </Breakpoint>
      

      <Container className="justify-content-end">
        <Menu items={pages} />
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
