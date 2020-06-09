import React from 'react';
import { Link } from '@reach/router';
import Nav from 'react-bootstrap/Nav';
import ExternalLink from '../Buttons/ExternalLink';
import { pages } from '../../config/menu';
import './menu.scss';

const Menu = () => (
  <Nav className="menu-nav">
    {pages.map((page, index) => (
      <Nav.Item key={index}>
        {page.external ? externalPage(page) : (
          <Link to={page.location}>{page.name}</Link>
        )}
      </Nav.Item>
    ))}
  </Nav>
);

const externalPage = page => (
  <ExternalLink 
    placement="right"
    variant="outline-info"
    destinationUrl={page.location}
    showIcon>
      {page.name}
  </ExternalLink>
);



export default Menu;