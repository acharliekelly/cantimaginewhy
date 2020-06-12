import React from 'react';
import Container from 'react-bootstrap/Container';
// import { Parallax } from "react-parallax";
// import { parallaxImageSrc } from '../utils/cloudinaryApi';
import { aboutContent } from '../config/text';
import { sections } from '../config/menu';
import { itemDisplayTypes } from '../utils/constants';
import Menu from '../components/Menu';
import './page.scss';

const SectionMenu = ({ subMenu }) => (
  <Menu 
    items={sections} 
    navClass="section-nav"
    displayStyle={itemDisplayTypes.iconAndText}
    subMenu={subMenu} 
    homeItem={{
      name: 'About',
      location: '.',
      icon: 'id-card'
    }} /> 
);

const SectionContent = ({ sectionId }) => {
  return aboutContent[sectionId].map((content, index) => (
    <section key={index}>
      {content}
    </section>
  ))
};


const AboutWrapper = ({ children }) => (
  <div className="content about-content">
    <Container className="about">
      {children}
    </Container>
  </div>
);

/**
 * Active section
 * path = "/about/:sectionId"
 */
export const AboutSection = ({ sectionId }) => (
  <AboutWrapper>
    <SectionMenu subMenu />
    <Container className="active-content">
      <SectionContent sectionId={sectionId} />
    </Container>
  </AboutWrapper>
);

/**
 * Root page
 * path = "/about/"
 */
export const AboutPage = () => (
  <AboutWrapper>
    <SectionMenu />
    <Container className="active-content">
      <SectionContent sectionId="intro" />
    </Container>
  </AboutWrapper>
);