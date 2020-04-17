import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';


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

const NavMenu = () => (
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

const DropdownMenu = () => {
  const [ activeKey, setActiveKey ] = useState('Home')
  return (
    <DropdownButton 
      variant="secondary" 
      className="menu-drop" 
      title={activeKey}
      onSelect={setActiveKey}
      >
      {menuNavs.map((nav, index) => (
        <Dropdown.Item 
          key={index}
          eventKey={nav.name}
          active={nav.name === activeKey} 
          href={nav.external ? nav.location : `#/${nav.location}`}>
            {nav.name}
        </Dropdown.Item>
      ))}
    </DropdownButton>
  )
}


const Menu = props => props.type === 'drop' ? <DropdownMenu /> : <NavMenu />

export default Menu;
