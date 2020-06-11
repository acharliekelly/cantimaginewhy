import React from 'react';
import Container from 'react-bootstrap/Container';
import ContactLinks from '../components/ContactLinks';
import { contactText } from '../config/text';
import { itemDisplayTypes } from '../utils/constants';
import { sections } from '../config/menu';
// import { Breakpoint } from 'react-socks';
import withSizes from 'react-sizes';
import Menu from '../components/Menu';
import './page.scss';

const mapSizesToProps = sizes => ({
  showDesc: sizes.width >= 1000
});


const SectionContent = props => {
  const { sectionId, showDesc } = props;
  const contactDisplayStyle = showDesc ? itemDisplayTypes.description : itemDisplayTypes.iconAndText;
  
  return (
    <Container className="contact-links">
      <p className="connect-text">
        {contactText[sectionId]}
      </p>
      <ContactLinks group={sectionId} display={contactDisplayStyle} />
    </Container>
  )
}

// TODO: export this for reuse
const SectionMenu = ({ subMenu }) => (
  <Menu 
    items={sections} 
    navClass="section-nav"
    displayStyle={itemDisplayTypes.iconAndText}
    subMenu={subMenu} /> 
);

const ConnectWrapper = ({ children }) => (
  <div className="content connect">
    <header className="page-title">
      <strong>Ways to Connect</strong>
    </header>
    <Container className="contact">
      {children}
    </Container>
  </div>
);

const ConnectSection = props => (
  <ConnectWrapper>
    <SectionMenu subMenu />
    <Container className="active-content">
      <SectionContent {...props} />
    </Container>
  </ConnectWrapper>
)

const ConnectPage = props => {
  return props.sectionId ? (
    <ConnectSection {...props} />
  ) : (
    <ConnectWrapper>
      <SectionMenu />
    </ConnectWrapper>
  )
}
 
export default withSizes(mapSizesToProps)(ConnectPage);



