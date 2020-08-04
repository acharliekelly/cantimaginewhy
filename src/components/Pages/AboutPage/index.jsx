import React from 'react';
import Tab from 'react-bootstrap/Tab';
import Container from 'react-bootstrap/Container';
import { Parallax } from 'react-parallax';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Nav from 'react-bootstrap/Nav';
import { cleanImageSrc } from 'Api/cloudinaryApi';
import { SectionTabs } from '../../../utils/constants';
import { Breakpoint } from 'react-socks';

import './about.scss';




const AboutPage = ({ aboutInfo }) => (
  <Container className="content about-content">
    <header className="intro-text">
      {aboutInfo.contentText.intro.map((section, index) => (
        <section key={index}>
          {section}
        </section>
      ))}
    </header>
    <Breakpoint lg up>
      <Parallax bgImage={cleanImageSrc('me/caterpillar2', 800)} strength={500}>
        <div style={{ height: 400 }} />
      </Parallax>
    </Breakpoint>
    
    <Tab.Container defaultActiveKey="art">
      {Object.values(SectionTabs).map(tab => (
        <Nav.Item>
          <Nav.Link eventKey={tab.name}>
            <FontAwesomeIcon icon={tab.icon} />
            <span className="tab-text">{tab.label}</span>
          </Nav.Link>
        </Nav.Item>
      ))}
      
      <Tab.Content>
        {['art', 'design', 'tech'].map(keyName => (
          <Tab.Pane eventKey={keyName} className={`${keyName}-content`}>
            <Container>
              <div className="me-text">
              {aboutInfo.contentText[keyName].map((section, index) => (
                <section key={index}>
                  {section}
                </section>
              ))}
              </div>
            </Container>
          </Tab.Pane>
        ))}
      </Tab.Content>
    </Tab.Container>
  </Container>
);

export default AboutPage;
