import React from 'react';
import { NavLink } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import { Image, CloudinaryContext } from 'cloudinary-react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SocialMediaLinks from './SocialMediaLinks';

const Menu = (handleLogin, handleSearch) => {
  return (
    <CloudinaryContext cloudName="cantimaginewhy">
      <header className="menu">
        <div className="site-logo">
          <Image publicId="ck_logo" height="100" />
        </div>
        <div className="nav-grid">
          <Nav className="left-col" defaultActiveKey="/home">
            <Nav.Item>
              <NavLink to="/home">Home</NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink to="/artwork">Artwork</NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink to="/about">About</NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink to="/contact">Contact</NavLink>
            </Nav.Item>
          </Nav>
          <SocialMediaLinks />
        </div>
        
      </header>
    </CloudinaryContext>
  );
}

export default Menu;
