import React from 'react';
import { NavLink } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import { Image, CloudinaryContext } from 'cloudinary-react';

const Menu = (handleLogin, handleSearch) => {
  return (
    <CloudinaryContext cloudName="cantimaginewhy">
      <header className="menu">
        <div className="column left-col justify-content-center site-logo lg-2">
          <Image publicId="ck_logo" height="100" />
        </div>
        <Nav className="column mid-col lg-4" defaultActiveKey="/home">
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
        <div className="column right-col lg-2">
          <div className="top-row">
            <Image className="login" publicId="icon/login-icon" width="30" />
            <span className="login-text">Sign Up / Login</span>
            <Image className="cart" publicId="icon/shopping-cart" width="30" />
          </div>
          <div className="bottom-row">
            <Form.Control type="text" size="sm" placeholder="e.g. Boston, Summer, etc" />
          </div>
        </div>
      </header>
    </CloudinaryContext>
  );
}

export default Menu;
