import React from 'react';
import { NavLink } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';


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
    location: "connect"
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


const Menu = props => (
  <Nav className="menu-nav" >
    {menuNavs.map((nav, index) => (
      <Nav.Item key={index}>
        {nav.external ? externalLnk(nav) : (
          <NavLink to={nav.location}>{nav.name}</NavLink>
        )}
      </Nav.Item>
    ))}
  </Nav>
);

export default Menu;
