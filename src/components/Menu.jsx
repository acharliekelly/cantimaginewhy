import React from 'react';
import { NavLink } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
// import Form from 'react-bootstrap/Form';
import { Image, CloudinaryContext } from 'cloudinary-react';

const Menu = (handleLogin, handleSearch) => {
  return (
    <CloudinaryContext cloudName="cantimaginewhy">
      <header className="menu">
        <div className="site-logo">
          <Image publicId="ck_logo" height="100" />
        </div>
        <div className="nav-grid">
          <div className="top-row left-col">
            <span className="site-title">Can't Imagine Why</span>
          </div>
          <div className="top-row right-col">
          </div>
          <Nav className="bottom-row left-col" defaultActiveKey="/home">
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
          <div className="bottom-row right-col" />
        </div>
      </header>
    </CloudinaryContext>
  );
}

export default Menu;
