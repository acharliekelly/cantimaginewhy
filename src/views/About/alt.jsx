import React from 'react';
import Tab from 'react-bootstrap/Tab';
import Container from 'react-bootstrap/Container';
import { Parallax } from "react-parallax";
import TabNavs from '../../components/Buttons/TabNavs';
import { cleanImageSrc } from '../../utils/cloudinaryApi';
import { aboutContent } from '../../config/text';
import { Breakpoint } from 'react-socks';

import './about.scss';

const SectionContent = ({ keyName }) => {
  console.log('retrieving content for ' + keyName)
  if (aboutContent[keyName]) {
    aboutContent[keyName].map((section, index) => {
      return (
      <section key={index}>
        {section}
      </section>
    )})
  } else {
    console.log(' - no content found')
    return null;
  }
  
}


const Panel = ({ keyName }) => (
  <Tab.Pane eventKey={keyName} className={`${keyName}-content`}>
    <Container>
      <div className="me-text">
        <SectionContent keyName={keyName} />
      </div>
    </Container>
  </Tab.Pane>
)

const AboutPage = props => (
  <Container className="content about-content">
    <header className="intro-text">
      <SectionContent keyName="intro" />
    </header>
    <Breakpoint lg up>
      <Parallax bgImage={cleanImageSrc('me/caterpillar2', 1000)} strength={500}>
        <div style={{ height: 400 }} />
      </Parallax>
    </Breakpoint>
    
    <Tab.Container defaultActiveKey="art">
      <TabNavs art design tech />
      <Tab.Content>
        <Panel keyName="art" />
        <Panel keyName="design" />
        <Panel keyName="tech" />
      </Tab.Content>
    </Tab.Container>
  </Container>
);

export default AboutPage;
