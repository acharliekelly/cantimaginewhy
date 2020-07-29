import React from 'react';
import Tab from 'react-bootstrap/Tab';
import Container from 'react-bootstrap/Container';
import { Parallax } from "./react-parallax";
import TabNavs from '../Buttons/TabNavs';
import { cleanImageSrc } from '../../utils/cloudinaryApi';
// import { aboutContent } from '../../json/text';
import { Breakpoint } from 'react-socks';

import './about.scss';

export const SectionContent = ({ keyName, contentText }) => (
  <>
    {contentText[keyName].map((section, index) => (
      <section key={index}>
        {section}
      </section>
    ))}
  </>
)


export const ContentPanel = ({ keyName }) => (
  <Tab.Pane eventKey={keyName} className={`${keyName}-content`}>
    <Container>
      <div className="me-text">
        <SectionContent keyName={keyName} />
      </div>
    </Container>
  </Tab.Pane>
)

const AboutPage = ({ isFetching, error, currentSection, contentText }) => (
  <Container className="content about-content">
    <header className="intro-text">
      <SectionContent keyName="intro" />
    </header>
    <Breakpoint lg up>
      <Parallax bgImage={cleanImageSrc('me/caterpillar2', 800)} strength={500}>
        <div style={{ height: 400 }} />
      </Parallax>
    </Breakpoint>
    
    <Tab.Container defaultActiveKey="art">
      <TabNavs art design tech />
      <Tab.Content>
        <ContentPanel keyName="art" />
        <ContentPanel keyName="design" />
        <ContentPanel keyName="tech" />
      </Tab.Content>
    </Tab.Container>
  </Container>
);

export default AboutPage;
