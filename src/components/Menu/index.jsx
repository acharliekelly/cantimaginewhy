import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ContactLinks from '../ContactLinks/';
import Logo from '../Logo/';
// import ExternalLink from '../Buttons/ExternalLink';
import { selectLightboxUtil} from '../../utils/imageUtils';


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
    name: "Contact",
    location: "contact"
  },
  {
    name: "Shop",
    location: "https://charlie-kelly.pixels.com",
    external: true
  }
];


const Menu = props => {
  return (
    <div className="menu-wrapper">
      <Navbar bg="light" className="justify-content-between">
        <Navbar.Brand>
          <Logo selectLightbox={props.selectLightbox} />
        </Navbar.Brand>
        <Container className="justify-content-end">
          <Nav >
            {menuNavs.map((nav, index) => (
              <Nav.Item key={index}>
                {nav.external ? (
                  <a href={nav.location} className="external-link" 
                    target="_blank" rel="noreferrer noopener">{nav.name}</a>
                ) : (
                  <NavLink to={nav.location}>{nav.name}</NavLink>
                )}
              </Nav.Item>
            ))}
          </Nav>
        </Container>
        <Container className="justify-content-end">
          <ContactLinks displayType="icon" size="2x" horizontal="md" />
        </Container>
      </Navbar>
    </div>
  );
}

Menu.propTypes = {
  selectLightbox: PropTypes.func.isRequired,
  devMode: PropTypes.func
}

Menu.defaultProps = {
  selectLightbox: selectLightboxUtil
};

export default Menu;
