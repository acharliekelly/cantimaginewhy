import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Nav from 'react-bootstrap/Nav';


const tabNav = (keyName, iconName, label) => (
  <Nav.Item>
    <Nav.Link eventKey={keyName}>
      <FontAwesomeIcon icon={iconName} />
      <span className="tab-text">{label}</span>
    </Nav.Link>
  </Nav.Item>
)

const TabNavs = props => {
  return (
    <Nav variant="tabs" className="tab-navs">
      {props.art && tabNav('art', 'palette', 'Art') }
      {props.design && tabNav('design', 'drafting-compass', 'Design')}
      {props.tech && tabNav('tech', 'file-code', 'Code')} 
    </Nav>
  );
} 


export default TabNavs;
