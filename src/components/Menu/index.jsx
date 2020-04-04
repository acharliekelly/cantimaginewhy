import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import ContactLinks from '../ContactLinks/';
import Logo from '../Logo/';
// import ExternalLink from '../Buttons/ExternalLink';



import './menu.scss';



const menuNavs = [
  {
    name: "Home",
    location: "home",
  },
  {
    name: "Artwork",
    location: "artwork"
  },
  {
    name: "About",
    location: "about",
  },
  {
    name: "Connect",
    location: "contact"
  },
  {
    name: "Shop",
    location: "https://charlie-kelly.pixels.com",
    external: true
  }
];

const externalLnk = nav => (
  <a href={nav.location} 
    className="external-link" 
    target="_blank" 
    rel="noreferrer noopener">
      {nav.name}
    </a>
)


const Menu = props => {
  return (
    <div className="menu-wrapper">
      <Navbar bg="light" className="justify-content-between" expand="lg">
        <Navbar.Brand>
          <Logo {...props} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="menu-content" />
        <Navbar.Collapse id="menu-content">
          <Container className="justify-content-end">
            <Nav >
              {menuNavs.map((nav, index) => (
                <Nav.Item key={index}>
                  {nav.external ? externalLnk(nav) : (
                    <NavLink to={nav.location}>{nav.name}</NavLink>
                  )}
                </Nav.Item>
              ))}
            </Nav>
          </Container>
          <Container className="justify-content-end">
            <ContactLinks 
              displayType="icon" 
              size="2x" 
              horizontal="md" 
              group="head" />
          </Container>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

Menu.propTypes = {
  selectLightbox: PropTypes.func,
  devMode: PropTypes.func
}


export default Menu;
