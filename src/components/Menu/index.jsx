import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import { Image, CloudinaryContext } from 'cloudinary-react';
import SocialMediaLinks from '../SocialMediaLinks';
import { fetchGallery } from '../../utils/imageApi';

import './menu.scss';

const Menu = props => {
  const { selectLightbox, devMode } = props;
  const logoId = 'cant_imagine_why';
  const openZoom = () => {
    fetchGallery('logo').then(res => {
      selectLightbox(logoId, res.data.resources);
    })
  }
  return (
    <CloudinaryContext className="menu-wrapper" cloudName="cantimaginewhy">
      <header className="menu">
        <div className="site-logo" onClick={openZoom}>
          <Image publicId="ciw-thumb" height="100" />
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
          
          <SocialMediaLinks devMode={devMode} />
        </div>
        
      </header>
    </CloudinaryContext>
  );
}

Menu.propTypes = {
  selectLightbox: PropTypes.func.isRequired,
  devMode: PropTypes.func.isRequired
}

export default Menu;
