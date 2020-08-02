import React from 'react';
import { storiesOf } from './@storybook/react';
import Tab from 'react-bootstrap/Tab';
import Nav from 'react-bootstrap/Nav';
import { FontAwesomeIcon } from './@fortawesome/react-fontawesome';
import { aboutContent } from '../../api/js/text';

import './about.scss';

const stories = storiesOf('AboutPage', module);

stories
  .add('Intro', () => (
    <div className="me-text">
      {aboutContent['intro'][0]}
    </div>
  ))
  .add('ContentPanel', () => (
  <Tab.Container defaultActiveKey="art">
    <Nav variant="tabs">
      <Nav.Item>
        <Nav.Link eventKey="art">
          <FontAwesomeIcon icon="palette" size="lg" />
          <span className="tab-text">Art</span>
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="design">
          <FontAwesomeIcon icon="drafting-compass" size="lg" />
          <span className="tab-text">Design</span>
        </Nav.Link>
      </Nav.Item>
    </Nav>
    
  </Tab.Container>
))
