import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Nav from 'react-bootstrap/Nav';

const TabNavs = props => (
  <Nav variant="tabs">
    <Nav.Item>
      <Nav.Link eventKey="art">
        <FontAwesomeIcon icon="palette" size="lg" />
        <span className="tab-text" style={{marginLeft: '1em'}}>Art</span>
      </Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link eventKey="tech">
        <FontAwesomeIcon icon="file-code" size="lg" />
        <span className="tab-text" style={{marginLeft: '1em'}}>Code</span>
      </Nav.Link>
    </Nav.Item>
  </Nav>
);


export default TabNavs;
