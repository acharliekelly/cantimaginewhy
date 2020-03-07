import React from 'react';
import { NavLink } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import { Image, CloudinaryContext } from 'cloudinary-react';
import SocialMediaLinks from '../SocialMediaLinks/';

import './menu.scss';

const Menu = () => {

  return (
    <CloudinaryContext className="menu-wrapper" cloudName="cantimaginewhy">
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
              <a href="https://charlie-kelly.pixels.com" target="_blank" rel="noreferrer noopener">Shop</a>
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
